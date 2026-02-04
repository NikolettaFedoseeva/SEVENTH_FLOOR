<script setup lang="ts">
import { reactive } from "vue";
import { CustomButton, Input, Card } from "@/shared/ui";

interface FilterState {
  search: string;
  minPrice: string;
  maxPrice: string;
  rooms: string;
}

const emit = defineEmits<{
  (e: "search", filters: FilterState): void;
}>();

const filters = reactive<FilterState>({
  search: "",
  minPrice: "",
  maxPrice: "",
  rooms: "",
});

function handleSearch() {
  emit("search", { ...filters });
}
</script>

<template>
  <Card class="filter-panel">
    <div class="filter-panel__grid">
      <Input
        v-model="filters.search"
        placeholder="Город, улица или ЖК"
        label="Поиск"
      />
      <div class="filter-panel__row">
        <Input
          v-model="filters.minPrice"
          type="number"
          placeholder="От"
          label="Цена, ₽"
        />
        <Input
          v-model="filters.maxPrice"
          type="number"
          placeholder="До"
          label="&nbsp;"
        />
      </div>
      <Input
        v-model="filters.rooms"
        type="number"
        placeholder="Кол-во комнат"
        label="Комнаты"
      />
      <div class="filter-panel__actions">
        <CustomButton size="sm" variant="primary" block @click="handleSearch">
          Найти
        </CustomButton>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.filter-panel {
  background-color: var(--bg-secondary);
  transition: background-color 0.3s ease;
}

.filter-panel__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.filter-panel__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.filter-panel__actions {
  display: flex;
  align-items: flex-end;
}

@media (min-width: 768px) {
  .filter-panel__grid {
    grid-template-columns: 2fr 1.5fr 1fr 1fr;
    align-items: flex-end;
  }
}
</style>
