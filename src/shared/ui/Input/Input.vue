<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: string | number;
  label?: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  type: "text",
  placeholder: "",
  disabled: false,
  error: "",
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<template>
  <div class="ui-input-wrapper" :class="{ 'ui-input-wrapper--error': error }">
    <label v-if="label" :for="id" class="ui-input-label">{{ label }}</label>
    <div class="ui-input-container">
      <input
        :id="id"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="ui-input"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
    </div>
    <span v-if="error" class="ui-input-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.ui-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.ui-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.ui-input-container {
  position: relative;
}

.ui-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}

.ui-input:focus {
  outline: none;
  border-color: #2b2b2b;
  box-shadow: 0 0 0 3px rgba(43, 43, 43, 0.1);
}

.ui-input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}

.ui-input-wrapper--error .ui-input {
  border-color: #ef4444;
}

.ui-input-wrapper--error .ui-input:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.ui-input-error {
  font-size: 0.75rem;
  color: #ef4444;
}
</style>
