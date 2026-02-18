<script setup lang="ts">
import { reactive, computed } from "vue";
import { FilterPanel, type FilterState } from "@/features/property-search";
import { PropertyCard } from "@/entities/property";
import { usePropertiesStore } from "@/entities/property"; // Import store
import { Container } from "@/shared/ui";
import { storeToRefs } from "pinia";
import type { Property } from "@/entities/property/model/types";

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

const filteredProperties = computed(() => {
  return properties.value.filter((property: Property) => {
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
        if (r === "4+") return property.rooms >= 4;
        if (r === "separate") return property.rooms === 1; // Simplification
        return property.rooms === parseInt(r);
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

function handleSearch(newFilters: FilterState) {
  // Deep merge or replace
  // filters is reactive, we can't just replace the object, need to update properties
  Object.assign(filters, newFilters);
}
</script>

<template>
  <div class="property-catalog">
    <Container>
      <div class="property-catalog__header">
        <h2 class="property-catalog__title">Каталог недвижимости</h2>
      </div>

      <div class="catalog-layout">
        <!-- Sidebar -->
        <aside class="catalog-sidebar">
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

<style scoped>
.property-catalog {
  padding: 4rem 0;
  background-color: var(--bg-primary);
  min-height: 80vh;
}

.property-catalog__header {
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.property-catalog__title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 1rem;
  letter-spacing: -0.025em;
}

.property-catalog__subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Layout */
.catalog-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .catalog-layout {
    flex-direction: row;
    align-items: flex-start;
  }

  .catalog-sidebar {
    width: 300px; /* Fixed width sidebar */
    flex-shrink: 0;
    margin-right: 2rem;
  }

  .catalog-main {
    flex: 1;
  }
}

.property-catalog__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

.property-catalog__empty {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.25rem;
  color: var(--text-secondary);
  padding: 4rem;
  background: var(--bg-secondary);
  border-radius: 1rem;
}

@media (min-width: 768px) {
  .property-catalog__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .property-catalog__grid {
    grid-template-columns: repeat(3, 1fr);
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
