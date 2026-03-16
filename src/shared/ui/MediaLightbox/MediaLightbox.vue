<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

// #region defineProps
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array as () => MediaItem[],
    default: () => [],
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});
// #endregion defineProps

// #region defineEmits
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
// #endregion defineEmits

// #region refs
const currentIndex = ref(props.initialIndex);
// #endregion refs

// #region watch
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    currentIndex.value = props.initialIndex;
  }
});
// #endregion watch

// #region Функции
const close = (): void => {
  emit("update:modelValue", false);
};

const next = (): void => {
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Loop to start
  }
};

const prev = (): void => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.items.length - 1; // Loop to end
  }
};

const handleBackdropClick = (event: MouseEvent): void => {
  if (event.target === event.currentTarget) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent): void => {
  if (!props.modelValue) return;
  
  if (e.key === "Escape") {
    close();
  } else if (e.key === "ArrowRight") {
    next();
  } else if (e.key === "ArrowLeft") {
    prev();
  }
};
// #endregion Функции

// #region Хуки жизненного цикла
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
// #endregion Хуки жизненного цикла

defineExpose({});
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="modelValue && items.length > 0"
        class="lightbox-backdrop"
        @click="handleBackdropClick"
      >
        <button class="lightbox-close" @click="close">&times;</button>
        
        <!-- Navigation Arrows -->
        <button 
          v-if="items.length > 1" 
          class="nav-btn nav-btn--prev" 
          @click.stop="prev"
          aria-label="Previous"
        >
          ‹
        </button>
        
        <div class="lightbox-content">
          <Transition name="fade" mode="out-in">
            <div :key="currentIndex" class="media-wrapper">
              <img 
                v-if="items[currentIndex].type === 'image'" 
                :src="items[currentIndex].url" 
                class="lightbox-media" 
                @click.stop 
              />
              <video 
                v-else 
                controls 
                autoplay 
                class="lightbox-media" 
                @click.stop
              >
                <source :src="items[currentIndex].url" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          </Transition>
        </div>

        <button 
          v-if="items.length > 1" 
          class="nav-btn nav-btn--next" 
          @click.stop="next"
          aria-label="Next"
        >
          ›
        </button>

        <!-- Counter -->
        <div class="lightbox-counter">
          {{ currentIndex + 1 }} / {{ items.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.lightbox-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  cursor: zoom-out;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.media-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.lightbox-media {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  cursor: default;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
  border-radius: 4px;
}

.lightbox-close {
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 3.5rem;
  line-height: 1;
  cursor: pointer;
  z-index: 10001;
  opacity: 0.6;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
}

.nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 4rem;
  width: 60px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.05);
  }

  &--prev {
    left: 20px;
    padding-right: 5px;
  }

  &--next {
    right: 20px;
    padding-left: 5px;
  }
}

.lightbox-counter {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 12px;
  border-radius: 20px;
  z-index: 10001;
}

/* Transitions */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-content,
.lightbox-leave-active .lightbox-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
