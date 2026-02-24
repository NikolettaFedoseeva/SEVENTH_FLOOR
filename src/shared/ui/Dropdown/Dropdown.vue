<script setup lang="ts">
import { computed } from "vue";

export interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    options: DropdownOption[];
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: "-",
  },
);

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
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
