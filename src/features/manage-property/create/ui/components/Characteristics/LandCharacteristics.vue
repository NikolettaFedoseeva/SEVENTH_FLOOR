<script setup lang="ts">
import { type PropType, watch } from "vue";
import { Input, Dropdown } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: { type: Object as PropType<any>, required: true },
  landStructures: { type: Array as PropType<any[]>, required: true },
  landPurpose: { type: Array as PropType<any[]>, required: true },
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
});
// #endregion defineProps

// Sync landArea with area as DB requires area to be NOT NULL
watch(() => props.form.area, (newVal) => {
  props.form.landArea = newVal;
});

defineExpose({});
</script>

<template>
  <div class="field small">
    <label>Площадь (сотки) <span class="required">*</span></label>
    <Input v-model="form.area" type="number" />
    <span v-if="errors.area" class="error-text">{{ errors.area }}</span>
  </div>
  <div class="field">
    <label>Строения на участке <span class="required">*</span></label>
    <Dropdown v-model="form.hasBuildings" :options="landStructures" />
    <span v-if="errors.hasBuildings" class="error-text">{{ errors.hasBuildings }}</span>
  </div>
  <div class="field">
    <label>Назначение участка <span class="required">*</span></label>
    <Dropdown v-model="form.landType" :options="landPurpose" />
  </div>
</template>
