<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePropertiesStore } from "@/entities/property";
import { Container, CustomButton } from "@/shared/ui";
import { storeToRefs } from "pinia";

// #region refs
const store = usePropertiesStore();
const { properties: allProperties } = storeToRefs(store);
const scrollContainer = ref<HTMLElement | null>(null);

let animationFrameId: number | null = null;
const isPaused = ref(false);
let pauseTimer: number | null = null;

// Drag state
const isDragging = ref(false);
const startX = ref(0);
const scrollLeftStart = ref(0);
// #endregion refs

// #region computed
// Duplicate properties to create infinite effect
const properties = computed(() => {
  const props = allProperties.value.slice(0, 10);
  if (props.length === 0) return [];
  return [...props, ...props, ...props]; // Triple the items for safety
});
// #endregion computed

// #region Функции
const startAutoScroll = (): void => {
  if (isPaused.value || isDragging.value) return;
  stopAutoScroll();

  const scroll = (): void => {
    if (scrollContainer.value && !isPaused.value && !isDragging.value) {
      scrollContainer.value.scrollLeft += 0.5; // Slower, smoother scroll
      checkScroll();
    }
    animationFrameId = requestAnimationFrame(scroll);
  };
  animationFrameId = requestAnimationFrame(scroll);
};

const stopAutoScroll = (): void => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const pauseAutoScroll = (duration = 5000): void => {
  isPaused.value = true;
  if (pauseTimer) clearTimeout(pauseTimer);

  pauseTimer = window.setTimeout(() => {
    isPaused.value = false;
    startAutoScroll();
  }, duration);
};

const checkScroll = (): void => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  const oneSetWidth = container.scrollWidth / 3;

  if (container.scrollLeft >= oneSetWidth * 2) {
    container.scrollLeft = oneSetWidth;
  } else if (container.scrollLeft <= 0) {
    container.scrollLeft = oneSetWidth;
  }
};

// Mouse Drag Handlers
const onMouseDown = (e: MouseEvent): void => {
  if (!scrollContainer.value) return;
  isDragging.value = true;
  startX.value = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeftStart.value = scrollContainer.value.scrollLeft;
  pauseAutoScroll(7000); // Longer pause on drag
};

const onMouseMove = (e: MouseEvent): void => {
  if (!isDragging.value || !scrollContainer.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX.value) * 2; // Scroll speed multiplier
  scrollContainer.value.scrollLeft = scrollLeftStart.value - walk;
  checkScroll();
};

const onMouseUp = (): void => {
  isDragging.value = false;
};

// Touch Handlers
const onTouchStart = (): void => {
  pauseAutoScroll(7000);
};
// #endregion Функции

// #region Хуки жизненного цикла
onMounted(() => {
  if (scrollContainer.value) {
    setTimeout(() => {
      if (scrollContainer.value) {
        const oneSetWidth = scrollContainer.value.scrollWidth / 3;
        scrollContainer.value.scrollLeft = oneSetWidth;
        startAutoScroll();
      }
    }, 500);
  }
});

onUnmounted(() => {
  stopAutoScroll();
  if (pauseTimer) clearTimeout(pauseTimer);
});
// #endregion Хуки жизненного цикла

defineExpose({});
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
        :class="{ 'is-dragging': isDragging }"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
        @touchstart="onTouchStart"
        @mouseenter="pauseAutoScroll(3000)"
      >
        <div
          v-for="(item, index) in properties"
          :key="`${item.id}-${index}`"
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
  cursor: grab;
  user-select: none;
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &.is-dragging {
    cursor: grabbing;
    scroll-behavior: auto; /* Disable smooth scroll during drag for better feel */
  }
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
