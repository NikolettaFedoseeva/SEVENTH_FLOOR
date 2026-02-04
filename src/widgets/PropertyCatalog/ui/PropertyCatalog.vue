<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { FilterPanel } from "@/features/property-search";
import { PropertyCard } from "@/entities/property";
import { usePropertiesStore } from "@/entities/property"; // Import store
import { Container } from "@/shared/ui";
import { storeToRefs } from "pinia";

const filters = reactive({
  search: "",
  minPrice: "",
  maxPrice: "",
  rooms: "",
});

const store = usePropertiesStore();
const { properties } = storeToRefs(store);

const filteredProperties = computed(() => {
  return properties.value.filter((property) => {
    // Search by title or address
    const searchText = filters.search.toLowerCase();
    const titleMatch = property.title.toLowerCase().includes(searchText);
    const addressMatch = property.address.toLowerCase().includes(searchText);
    if (!titleMatch && !addressMatch) return false;

    // Price range
    const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
    if (property.price < minPrice || property.price > maxPrice) return false;

    // Rooms
    if (filters.rooms) {
      const rooms = parseInt(filters.rooms);
      if (property.rooms !== rooms) return false;
    }

    return true;
  });
});

function handleSearch(newFilters: any) {
  Object.assign(filters, newFilters);
}
</script>

<template>
  <div class="property-catalog">
    <Container>
      <div class="property-catalog__header">
        <h2 class="property-catalog__title">Каталог недвижимости</h2>
        <p class="property-catalog__subtitle">
          Мы подобрали для вас лучшие предложения на рынке
        </p>
        <div class="property-catalog__filters">
          <FilterPanel @search="handleSearch" />
        </div>
      </div>

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
    </Container>
  </div>
</template>

<style scoped>
.property-catalog {
  padding: 6rem 0;
  background-color: var(--bg-primary);
  min-height: 80vh;
}

.property-catalog__header {
  margin-bottom: 4rem;
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
  margin-bottom: 3rem;
  line-height: 1.6;
}

.property-catalog__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2.5rem;
}

.property-catalog__empty {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.25rem;
  color: var(--text-secondary);
  padding: 4rem;
}

@media (min-width: 640px) {
  .property-catalog__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .property-catalog__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* List Transitions */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* ensure leaving items are taken out of layout flow so others can move smoothly */
.list-leave-active {
  position: absolute;
}
</style>
