<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { FilterPanel, type FilterState } from "@/features/property-search";
import { PropertyCard } from "@/entities/property";
import { usePropertiesStore } from "@/entities/property"; // Import store
import { Container, CustomButton } from "@/shared/ui";
import { storeToRefs } from "pinia";
import type { Property } from "@/entities/property/model/types";

// #region refs
// Initial filter state matching FilterPanel
const filters = reactive<FilterState>({
  search: "",
  // region removed from type, using locations
  locations: [],
  adTypes: [],
  withPhotos: false,
  verified: false,
  rentPeriod: [],
  rooms: [],
  heating: [],
  minArea: "",
  maxArea: "",
  minFloor: "",
  maxFloor: "",
  buildingType: [],
  buildingStatus: [],
  parking: [],
  minPrice: "",
  maxPrice: "",
  currency: "usd",
});

const store = usePropertiesStore();
const { properties } = storeToRefs(store);
// #endregion refs

// #region computed
const filteredProperties = computed<Property[]>(() => {
  return properties.value.filter((property: Property) => {
    // 0. Exclude Soft Deleted
    if (property.isRemove) return false;

    // 1. Search (Title or Address)
    const searchText = filters.search.toLowerCase();
    if (searchText) {
      const titleMatch = property.title.toLowerCase().includes(searchText);
      const addressMatch = property.address.toLowerCase().includes(searchText);
      if (!titleMatch && !addressMatch) return false;
    }

    // 2. Locations (City / District)
    // The filter now provides a list of strings: "Тирасполь", "Бородинка", etc.
    // If ANY of the property's address fields (city inferred from address string? or district field) matches ANY of the filter locations.
    if (filters.locations && filters.locations.length > 0) {
      // We check if:
      // A) Property 'district' matches a selected location
      // B) Property 'address' contains a selected location (City)
      // C) Property 'town'/'city' field if we had one.

      // Simplistic check: does address or district match any selected filter?
      const match = filters.locations.some((loc) => {
        const locLower = loc.toLowerCase();
        const addressMatch = property.address.toLowerCase().includes(locLower);
        const districtMatch = property.district?.toLowerCase() === locLower;
        return addressMatch || districtMatch;
      });

      if (!match) return false;
    }

    // 2.1 Ad Types (Source)
    if (filters.adTypes.length > 0) {
      if (!property.source || !filters.adTypes.includes(property.source)) {
        return false;
      }
    }

    // 3. With Photos
    if (filters.withPhotos) {
      if (!property.imageUrl) return false;
    }

    // 4. Verified
    if (filters.verified) {
      if (!property.verified) return false;
    }

    // 5. Rooms (Multi-select)
    if (filters.rooms.length > 0) {
      // Logic: property.rooms number vs string filters like "1", "2", "3", "4+", "separate"
      // Assuming mock properties have 'rooms' as number.
      // "4+" means rooms >= 4. "separate" we might not have data for, skipping for now or assume 1?
      const match = filters.rooms.some((r) => {
        const pRooms = Number(property.rooms);
        if (r === "4+") return pRooms >= 4;
        if (r === "separate") return pRooms === 1; // Simplification
        return pRooms === parseInt(r);
      });
      if (!match) return false;
    }

    // 6. Heating (Multi-select)
    if (filters.heating.length > 0) {
      if (!property.heating || !filters.heating.includes(property.heating)) {
        return false;
      }
    }

    // 7. Area
    const minArea = filters.minArea ? parseInt(filters.minArea) : 0;
    const maxArea = filters.maxArea ? parseInt(filters.maxArea) : Infinity;
    if (property.area < minArea || property.area > maxArea) return false;

    // 8. Floor
    if (property.floor !== undefined) {
      const minFloor = filters.minFloor ? parseInt(filters.minFloor) : 0;
      const maxFloor = filters.maxFloor ? parseInt(filters.maxFloor) : Infinity;
      if (property.floor < minFloor || property.floor > maxFloor) return false;
    }

    // 9. Building Type & Status (Nested Logic)
    if (filters.buildingType.length > 0) {
      if (!property.buildingType) return false;

      // Must match one of the selected building types
      if (!filters.buildingType.includes(property.buildingType)) {
        return false;
      }

      // If it matches 'new', verify status if specific statuses are selected
      if (
        property.buildingType === "new" &&
        filters.buildingStatus.length > 0
      ) {
        if (
          !property.buildingStatus ||
          !filters.buildingStatus.includes(property.buildingStatus)
        ) {
          return false;
        }
      }
    }

    // 10. Parking (Multi-select)
    if (filters.parking.length > 0) {
      if (!property.parking || !filters.parking.includes(property.parking)) {
        return false;
      }
    }

    // 11. Rent Period (Multi-select)
    if (filters.rentPeriod.length > 0) {
      // Assuming properties need a rentPeriod field or we map it somehow.
      // Current mock data mostly lacks 'rentPeriod', only added to interface.
      // If property doesn't have it, and we filter by it, usually strictly exclude.
      // But for safe-guarding existing mocks:
      if (
        property.rentPeriod &&
        !filters.rentPeriod.includes(property.rentPeriod)
      ) {
        return false;
      }
    }

    // 12. Price
    const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
    if (property.price < minPrice || property.price > maxPrice) return false;

    return true;
  });
});
// #endregion computed

// #region Функции
const searchInput = ref("");
const isFilterOpen = ref<boolean>(false);

function applyMainSearch(): void {
  filters.search = searchInput.value;
}

function handleSearch(newFilters: FilterState): void {
  // Deep merge or replace
  // filters is reactive, we can't just replace the object, need to update properties
  const currentSearch = filters.search;
  Object.assign(filters, newFilters);
  filters.search = currentSearch;
}
// #endregion Функции

defineExpose({});
</script>

<template>
  <div class="property-catalog">
    <Container>
      <div class="property-catalog__header">
        <h2 class="property-catalog__title">Каталог недвижимости</h2>
      </div>

      <div class="property-catalog__search">
        <div class="search-input-group">
          <svg
            class="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#9ca3af"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            type="text"
            class="search-input"
            v-model="searchInput"
            @keyup.enter="applyMainSearch"
            placeholder="Поиск по названию или адресу..."
          />
          <button class="search-button" @click="applyMainSearch">Найти</button>
        </div>
      </div>

      <!-- Mobile Filter Toggle -->
      <div class="mobile-filter-toggle">
        <CustomButton
          block
          variant="outline"
          @click="isFilterOpen = !isFilterOpen"
        >
          <svg
            v-if="!isFilterOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="toggle-icon"
          >
            <polygon
              points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
            ></polygon>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="toggle-icon"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          {{ isFilterOpen ? "Скрыть фильтры" : "Фильтры" }}
        </CustomButton>
      </div>

      <div class="catalog-layout">
        <!-- Sidebar -->
        <aside class="catalog-sidebar" :class="{ 'is-open': isFilterOpen }">
          <FilterPanel @search="handleSearch" />
        </aside>

        <!-- Grid -->
        <div class="catalog-main">
          <TransitionGroup name="list" tag="div" class="property-catalog__grid">
            <PropertyCard
              v-for="item in filteredProperties"
              :key="item.id"
              :property="item"
              class="property-catalog__item"
            />
            <div
              v-if="filteredProperties.length === 0"
              class="property-catalog__empty"
              key="empty-placeholder"
            >
              <p>Ничего не найдено по вашему запросу</p>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </Container>
  </div>
</template>

<style lang="scss" scoped>
.property-catalog {
  padding: 4rem 0;
  background-color: var(--bg-primary);
  min-height: 80vh;

  &__header {
    margin-bottom: 3rem;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.025em;

    @media (max-width: 767px) {
      font-size: 1.75rem;
    }
  }

  &__search {
    margin-bottom: 2rem;
    width: 100%;

    .search-input-group {
      display: flex;
      align-items: center;
      background-color: var(--bg-secondary, #ffffff);
      border: 1px solid var(--border-color, #d1d5db);
      border-radius: 12px;
      padding: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

      @media (max-width: 639px) {
        flex-direction: column;
        padding: 1rem;
        gap: 0.75rem;
      }

      &:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
      }
    }

    .search-icon {
      width: 24px;
      height: 24px;
      margin-left: 1rem;
      margin-right: 0.75rem;
      flex-shrink: 0;

      @media (max-width: 639px) {
        display: none; // Hide icon on very small screens to save space
      }
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1.125rem;
      color: var(--text-primary, #111827);
      background: transparent;
      padding: 0.75rem 0;

      @media (max-width: 639px) {
        width: 100%;
        text-align: center;
        font-size: 1rem;
      }

      &::placeholder {
        color: #9ca3af;
      }
    }

    .search-button {
      background-color: #2b2b2b;
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 0.875rem 2rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      @media (max-width: 639px) {
        width: 100%;
        padding: 0.75rem 1rem;
      }

      &:hover {
        background-color: #3b82f6;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      &:active {
        transform: translateY(1px);
        box-shadow: none;
      }
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__empty {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 1.25rem;
    color: var(--text-secondary);
    padding: 4rem;
    background: var(--bg-secondary);
    border-radius: 1rem;
  }
}

/* Mobile Toggle Layout */
.mobile-filter-toggle {
  display: block;
  margin-bottom: 1.5rem;

  .toggle-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
  }

  @media (min-width: 1024px) {
    display: none;
  }
}

/* Layout */
.catalog-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .catalog-sidebar {
    width: 100%;
    /* Animation base */
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease,
      margin-bottom 0.3s ease;
    margin-bottom: 0;

    &.is-open {
      max-height: 2500px; /* Arbitrary large height to fit content */
      opacity: 1;
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;

    .catalog-sidebar {
      width: 300px; /* Fixed width sidebar */
      flex-shrink: 0;
      margin-right: 2rem;
      /* Reset animation properties for desktop */
      max-height: none !important;
      opacity: 1 !important;
      overflow: visible !important;
      margin-bottom: 0;
    }

    .catalog-main {
      flex: 1;
    }
  }
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
