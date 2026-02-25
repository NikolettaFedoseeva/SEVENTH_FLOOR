<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import type { Property } from "@/entities/property/model/types";
import { useHead } from "@unhead/vue";
import { usePropertiesStore } from "@/entities/property/model/store";
import { PropertyCatalog } from "@/widgets";

useHead({
  title: "Каталог недвижимости",
  meta: [
    {
      name: "description",
      content:
        "Большой выбор недвижимости в Тирасполе. Квартиры, дома, коммерческие помещения. Актуальные цены и фото.",
    },
  ],
});

const propertiesStore = usePropertiesStore();

onMounted(() => {
  propertiesStore.fetchProperties();
});
</script>

<template>
  <div class="catalog-page">
    <main>
      <div class="catalog-page__content">
        <PropertyCatalog />
      </div>
    </main>
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
    margin: 0 0 1rem;
    letter-spacing: -0.025em;
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

/* Layout */
.catalog-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.catalog-sidebar {
  @media (min-width: 1024px) {
    width: 300px; /* Fixed width sidebar */
    flex-shrink: 0;
    margin-right: 2rem;
  }
}

.catalog-main {
  @media (min-width: 1024px) {
    flex: 1;
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
