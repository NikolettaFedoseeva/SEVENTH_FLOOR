<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: string | number;
  label?: string;
  type?: "text" | "number" | "email" | "password" | "tel" | "textarea";
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  maxlength?: string | number;
  rows?: string | number;
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
  set(val: string | number) {
    emit("update:modelValue", val);
  },
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.type === "number") {
    // Remove all non-digit characters
    const numericValue = target.value.replace(/\D/g, "");
    target.value = numericValue;
    value.value = numericValue;
  } else {
    value.value = target.value;
  }
};

const inputType = computed(() => {
  return props.type === "number" ? "text" : props.type;
});
</script>

<template>
  <div class="ui-input-wrapper" :class="{ 'ui-input-wrapper--error': error }">
    <label v-if="label" :for="id" class="ui-input-label">{{ label }}</label>
    <div class="ui-input-container">
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :value="value"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :rows="rows || 3"
        class="ui-input ui-textarea"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
      <input
        v-else
        :id="id"
        :value="value"
        @input="handleInput"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        class="ui-input"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
    </div>
    <span v-if="error" class="ui-input-error">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
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
  padding: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
  height: 40px;
}

.ui-textarea {
  height: auto;
  resize: vertical;
  min-height: 80px;
}

.ui-input:focus {
  outline: none;
  border-color: #2b2b2b;
  // box-shadow: 0 0 0 3px rgba(43, 43, 43, 0.1);
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
  // box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.ui-input-error {
  font-size: 0.75rem;
  color: #ef4444;
}
</style>
