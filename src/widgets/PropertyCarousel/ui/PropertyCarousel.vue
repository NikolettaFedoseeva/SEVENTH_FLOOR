<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePropertiesStore } from "@/entities/property";
import { Container, CustomButton } from "@/shared/ui";
import { storeToRefs } from "pinia";

const store = usePropertiesStore();
const { properties: allProperties } = storeToRefs(store);

// Duplicate properties to create infinite effect
const properties = computed(() => {
  const props = allProperties.value.slice(0, 10);
  return [...props, ...props, ...props]; // Triple the items for safety
});

const scrollContainer = ref<HTMLElement | null>(null);

// Auto-scroll logic
let intervalId: number | null = null;
let animationFrameId: number | null = null;

const startAutoScroll = () => {
    stopAutoScroll();
    // Continuous smooth scrolling
    const scroll = () => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollLeft += 1;
            checkScroll();
        }
        animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
};

const stopAutoScroll = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const checkScroll = () => {
    if (!scrollContainer.value) return;
    const container = scrollContainer.value;
    
    // If we've scrolled past the first set of items (1/3 of total width), reset to 0
    // Actually, reset to the start of the second set to avoid jump
    const oneSetWidth = container.scrollWidth / 3;
    
    if (container.scrollLeft >= oneSetWidth * 2) {
        container.scrollLeft = oneSetWidth;
    } else if (container.scrollLeft <= 0) {
         container.scrollLeft = oneSetWidth;
    }
};




onMounted(() => {
  // Set initial scroll position to the middle set
  if (scrollContainer.value) {
      setTimeout(() => {
          if (scrollContainer.value) {
            const oneSetWidth = scrollContainer.value.scrollWidth / 3;
            scrollContainer.value.scrollLeft = oneSetWidth;
             startAutoScroll();
          }
      }, 500); // Wait for render
  }
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

<style lang="scss" scoped>
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
