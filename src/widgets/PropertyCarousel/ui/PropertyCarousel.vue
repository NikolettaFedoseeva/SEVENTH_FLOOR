<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePropertiesStore } from "@/entities/property";
import { Container, CustomButton } from "@/shared/ui";
import { storeToRefs } from "pinia";

const store = usePropertiesStore();
const { properties: allProperties } = storeToRefs(store);

// Take 10 items
const properties = computed(() => allProperties.value.slice(0, 10));
const scrollContainer = ref<HTMLElement | null>(null);

// Auto-scroll logic
let intervalId: number | null = null;

const startAutoScroll = () => {
  stopAutoScroll();
  intervalId = window.setInterval(() => {
    scrollRight();
  }, 3000); // Scroll every 3 seconds
};

const stopAutoScroll = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const scrollLeft = () => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  const cardWidth = container.firstElementChild?.clientWidth || 300;
  container.scrollBy({ left: -cardWidth, behavior: "smooth" });
};

const scrollRight = () => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  // Check if we are at the end
  if (
    Math.abs(
      container.scrollWidth - container.clientWidth - container.scrollLeft,
    ) < 5
  ) {
    container.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    container.scrollBy({ left: cardWidth, behavior: "smooth" });
  }
};

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
  stopAutoScroll();
});
</script>

<template>
  <div class="property-carousel">
    <Container>
      <div class="property-carousel__header">
        <h2 class="property-carousel__title">Популярные направления</h2>
        <div class="property-carousel__nav">
          <button
            class="nav-btn nav-btn--prev"
            @click="scrollLeft"
            aria-label="Previous"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            class="nav-btn nav-btn--next"
            @click="scrollRight"
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div
        class="carousel-track"
        ref="scrollContainer"
        @mouseenter="stopAutoScroll"
        @mouseleave="startAutoScroll"
      >
        <div
          v-for="item in properties"
          :key="item.id"
          class="carousel-card"
          :style="{ backgroundImage: `url(${item.imageUrl})` }"
        >
          <div class="carousel-card__overlay">
            <h3 class="carousel-card__title">{{ item.title }}</h3>
            <div class="carousel-card__content">
              <span class="carousel-card__price">
                {{ item.price.toLocaleString("ru-RU") }} ₽
              </span>
              <CustomButton
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

      <div class="property-carousel__actions">
        <CustomButton variant="primary" size="lg" to="/catalog">
          Перейти в каталог
        </CustomButton>
      </div>
    </Container>
  </div>
</template>

<style scoped>
.property-carousel {
  padding: 6rem 0;
  background-color: var(--bg-secondary);
}

.property-carousel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.property-carousel__title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.property-carousel__nav {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--text-primary);
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 2rem;
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-card {
  flex: 0 0 350px;
  height: 450px;
  border-radius: 1.5rem;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}

.carousel-card:hover {
  transform: translateY(-5px);
}

.carousel-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
}

.carousel-card__title {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.carousel-card__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.carousel-card__price {
  color: #fbbf24;
  font-weight: 700;
  font-size: 1.1rem;
}

.property-carousel__actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .property-carousel__header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .carousel-card {
    flex: 0 0 280px;
    height: 380px;
  }
}
</style>
