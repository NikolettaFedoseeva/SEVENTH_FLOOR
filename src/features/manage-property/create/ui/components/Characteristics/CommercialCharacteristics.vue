<script setup lang="ts">
import { Input } from "@/shared/ui";

const props = defineProps<{
  form: any;
  commercialTypeList: any[];
}>();
</script>

<template>
  <div class="field">
    <label>Тип недвижимости <span class="required">*</span></label>
    <div class="checkbox-group-vertical">
      <label
        v-for="c in commercialTypeList"
        :key="c.value"
        class="checkbox-label-sm"
      >
        <input
          type="checkbox"
          :value="c.value"
          v-model="form.commercialTypes"
        />
        {{ c.label }}
      </label>
    </div>
  </div>
  <div class="field small">
    <label>Общая площадь (м²) <span class="required">*</span></label>
    <Input v-model="form.area" type="number" />
  </div>
</template>
