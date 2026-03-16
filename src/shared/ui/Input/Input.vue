<script setup lang="ts">
import { computed, nextTick, type PropType } from "vue";

// #region defineProps
const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<
      "text" | "number" | "email" | "password" | "tel" | "textarea"
    >,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
  maxlength: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  rows: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  mask: {
    type: String,
    default: "",
  },
});
// #endregion defineProps

// #region defineEmits
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();
// #endregion defineEmits

// #region computed
const value = computed<string | number>({
  get() {
    return props.modelValue;
  },
  set(val: string | number) {
    emit("update:modelValue", val);
  },
});

const inputType = computed<string>(() => {
  return props.type === "number" ? "text" : props.type;
});
// #endregion computed

// #region Функции
const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  let rawValue = target.value;
  const cursorPosition = target.selectionStart;

  if (props.mask) {
    const mask = props.mask;
    let cleanValue = rawValue.replace(/\D/g, "");
    
    // special handling for +373 mask to avoid duplication if user types it
    const staticDigits = mask.split('#')[0].replace(/\D/g, "");
    if (staticDigits && cleanValue.startsWith(staticDigits)) {
      cleanValue = cleanValue.slice(staticDigits.length);
    }

    let maskedValue = "";
    let dataIndex = 0;

    for (let i = 0; i < mask.length && dataIndex < cleanValue.length; i++) {
      if (mask[i] === "#") {
        maskedValue += cleanValue[dataIndex];
        dataIndex++;
      } else {
        maskedValue += mask[i];
      }
    }
    
    // If the next character in mask is static, add it too (UX enhancement)
    const nextCharIndex = maskedValue.length;
    if (nextCharIndex < mask.length && mask[nextCharIndex] !== "#" && dataIndex < cleanValue.length) {
       // This loop might be needed if there are multiple static chars
    }

    target.value = maskedValue;
    value.value = maskedValue;

    // Restore cursor position roughly (simple version)
    // Note: for a fully robust solution we'd need more complex logic, 
    // but this is better than nothing.
    nextTick(() => {
      target.setSelectionRange(target.value.length, target.value.length);
    });
  } else if (props.type === "number") {
    const numericValue = rawValue.replace(/\D/g, "");
    target.value = numericValue;
    value.value = numericValue;
  } else {
    value.value = rawValue;
  }
};
// #endregion Функции

defineExpose({});
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
