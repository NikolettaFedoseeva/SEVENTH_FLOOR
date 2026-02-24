<script setup lang="ts">
import { Input, Dropdown } from "@/shared/ui";

const props = defineProps<{
  form: any;
  landStructures: any[];
  landPurpose: any[];
}>();
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
