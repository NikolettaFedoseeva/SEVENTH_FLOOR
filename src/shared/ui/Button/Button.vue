<script setup lang="ts">
import { type PropType } from "vue";
// #region defineProps
const props = defineProps({
  variant: {
    type: String as PropType<
      "primary" | "secondary" | "outline" | "text" | "danger"
    >,
    default: "primary",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: undefined,
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
});
// #endregion defineProps

// #region defineEmits
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
// #endregion defineEmits

defineExpose({});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :type="!to ? type : undefined"
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--block': block },
    ]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.5;
}

.ui-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.ui-button--primary {
  background-color: #2b2b2b;
  color: #ffffff;
}

.ui-button--primary:not(:disabled):hover {
  background-color: #404040;
}

.ui-button--secondary {
  background-color: #f3f4f6;
  color: #1f2937;
}

.ui-button--secondary:not(:disabled):hover {
  background-color: #e5e7eb;
}

.ui-button--outline {
  background-color: transparent;
  border-color: #e5e7eb;
  color: #1f2937;
}

.ui-button--outline:not(:disabled):hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.ui-button--text {
  background-color: transparent;
  color: #4b5563;
  padding-left: 0;
  padding-right: 0;
}

.ui-button--text:not(:disabled):hover {
  color: #111827;
}

.ui-button--danger {
  background-color: #ef4444;
  color: white;
}

.ui-button--danger:not(:disabled):hover {
  background-color: #dc2626;
}

/* Sizes */
.ui-button--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.ui-button--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.ui-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Modifiers */
.ui-button--block {
  width: 100%;
}
</style>
