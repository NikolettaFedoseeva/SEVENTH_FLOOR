<script setup lang="ts">
import { type PropType } from "vue";
import { Input, Dropdown } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: { type: Object as PropType<any>, required: true },
  landStructures: { type: Array as PropType<any[]>, required: true },
  landPurpose: { type: Array as PropType<any[]>, required: true },
});
// #endregion defineProps

defineExpose({});
</script>

<template>
  <div class="field small">
    <label>Площадь (сотки) <span class="required">*</span></label>
    <Input v-model="form.landArea" type="number" />
  </div>
  <div class="field">
    <label>Строения на участке <span class="required">*</span></label>
    <Dropdown v-model="form.hasBuildings" :options="landStructures" />
  </div>
  <div class="field">
    <label>Назначение участка <span class="required">*</span></label>
    <Dropdown v-model="form.landType" :options="landPurpose" />
  </div>
</template>
