<script setup lang="ts">
import { type PropType } from "vue";
import { Input } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: { type: Object as PropType<any>, required: true },
  commercialTypeList: { type: Array as PropType<any[]>, required: true },
});
// #endregion defineProps

defineExpose({});
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
