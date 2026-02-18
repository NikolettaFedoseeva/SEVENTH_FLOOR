<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface Props {
  modelValue: boolean;
  title?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    close();
  }
};

// Close on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.modelValue) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">{{ title }}</h3>
            <button class="modal-close" @click="close">&times;</button>
          </div>

          <div class="modal-body">
            <slot />
          </div>

          <div class="modal-footer">
            <slot name="footer" :close="close">
              <button class="btn-cancel" @click="close">Закрыть</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.modal-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: #64748b;
  padding: 0;
    
  &:hover {
    color: #0f172a;
  }
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  color: #334155;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

.btn-cancel {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  background-color: white;
  color: #334155;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f1f5f9;
  }
}
</style>
