<script setup lang="ts">
import { computed, type PropType } from "vue";

// #region types
export interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
}
// #endregion types

// #region defineProps
const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<string | number | null>,
    default: null,
  },
  options: {
    type: Array as PropType<DropdownOption[]>,
    required: true,
  },
  placeholder: {
    type: String,
    default: "-",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
// #endregion defineProps

// #region defineEmits
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();
// #endregion defineEmits

// #region computed
const value = computed<string | number | null>({
  get: () => props.modelValue,
  set: (val: string | number | null) => emit("update:modelValue", val),
});
// #endregion computed

defineExpose({});
</script>

<template>
  <select v-model="value" class="custom-select" :disabled="disabled">
    <option :value="undefined">{{ placeholder }}</option>
    <option
      v-for="(opt, index) in options"
      :key="opt.value !== undefined ? String(opt.value) : index"
      :value="opt.value"
      :disabled="opt.disabled"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.custom-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.5;
  height: 40px;
}
</style>
