<script setup lang="ts">
import { ref, computed } from "vue";
import { usePropertiesStore } from "@/entities/property";
import { Container, CustomButton } from "@/shared/ui";
import { storeToRefs } from "pinia";

const store = usePropertiesStore();
const { properties: allProperties } = storeToRefs(store);

// Limit to 5 items for the visual effect (as seen in references)
const properties = computed(() => allProperties.value.slice(0, 5));
const activeId = ref<number | string>(0);

// Initialize activeId when properties are available
if (properties.value.length > 0) {
  activeId.value = properties.value[0].id;
}

function setActive(id: number | string) {
  activeId.value = id;
}
</script>

<template>
  <div class="expanding-carousel">
    <Container>
      <div class="expanding-carousel__header">
        <h2 class="expanding-carousel__title">Популярные направления</h2>
      </div>

      <div class="expanding-cards">
        <div
          v-for="item in properties"
          :key="item.id"
          class="card-panel"
          :class="{ 'card-panel--active': activeId === item.id }"
          :style="{ backgroundImage: `url(${item.imageUrl})` }"
          @click="setActive(item.id)"
          @mouseenter="setActive(item.id)"
        >
          <div class="card-panel__overlay">
            <h3 class="card-panel__title">{{ item.title }}</h3>
            <!-- Additional content only visible when active -->
            <div class="card-panel__content">
              <p class="card-panel__desc">{{ item.description }}</p>
              <div class="card-panel__footer">
                <span class="card-panel__price">
                  {{ item.price.toLocaleString("ru-RU") }} ₽
                </span>
                <CustomButton
                  class="card-panel__btn"
                  variant="outline-white"
                  size="sm"
                  :to="`/catalog/${item.id}`"
                >
                  Обзор
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<style scoped>
.expanding-carousel {
  padding: 6rem 0;
  background-color: var(--bg-secondary);
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.expanding-carousel__header {
  margin-bottom: 3rem;
  text-align: center;
}

.expanding-carousel__title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.expanding-cards {
  display: flex;
  width: 100%;
  height: 600px; /* Tall panels */
  gap: 10px;
}

.card-panel {
  position: relative;
  height: 100%;
  border-radius: 20px; /* Reduced radius for cleaner look */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  flex: 0.5; /* Default collapsed state */
  transition: flex 0.7s cubic-bezier(0.05, 0.6, 0.4, 0.9),
    border-radius 0.3s ease;
  overflow: hidden;
}

.card-panel--active {
  flex: 5; /* Expand factor */
  /* border-radius: 25px; Optional subtle change */
}

.card-panel__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  /* Darken inactive panels more */
  transition: background 0.3s ease;
}

.card-panel:not(.card-panel--active) .card-panel__overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.card-panel__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  /* Vertical text for inactive state on Desktop? */
  /* transform: rotate(-90deg); */
  /* transform-origin: left bottom; */
  /* This often tricky with layout. Let's keep it horizontal but simple for now
     or just hide it if too narrow. */
  opacity: 0.8;
}

.card-panel--active .card-panel__title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  opacity: 1;
}

.card-panel__content {
  opacity: 0;
  max-height: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  /* Hide content when not active */
  visibility: hidden;
}

.card-panel--active .card-panel__content {
  opacity: 1;
  max-height: 200px; /* Estimate height */
  transform: translateY(0);
  visibility: visible;
  transition-delay: 0.3s; /* Wait for flex expand */
}

.card-panel__desc {
  color: #e2e8f0;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.card-panel__footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.card-panel__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

/* Modify CustomButton to look good on dark bg */

/* Mobile Adaptation */
@media (max-width: 768px) {
  .expanding-cards {
    flex-direction: column;
    height: 800px; /* Taller area for stacking */
  }

  .card-panel {
    width: 100%;
    /* flex: 1 by default vertical */
  }

  .card-panel--active {
    flex: 3; /* Expand vertical */
  }

  .card-panel__title {
    font-size: 1.25rem;
  }

  .card-panel--active .card-panel__title {
    font-size: 1.75rem;
  }
}
</style>
