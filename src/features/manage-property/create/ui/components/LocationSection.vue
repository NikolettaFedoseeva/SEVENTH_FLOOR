<script setup lang="ts">
import { type PropType } from "vue";
import { Card, Input, Dropdown } from "@/shared/ui";

const regionOptions = [{ value: "ПМР", label: "ПМР" }];

const cityOptions = [
  { value: "Tiraspol", label: "Тирасполь" },
  { value: "Bender", label: "Бендеры" },
  { value: "Ribnita", label: "Рыбница" },
  { value: "Blijniy Hutor", label: "Ближний Хутор" },
  { value: "Grigoriopol", label: "Григориополь" },
  { value: "Dnestrovsk", label: "Днестровск" },
  { value: "Dubossary", label: "Дубоссары" },
  { value: "Kamenka", label: "Каменка" },
  { value: "Maiac", label: "Маяк" },
  { value: "Novotiraspolskiy", label: "Новотираспольский" },
  { value: "Parcani", label: "Парканы" },
  { value: "Pervomaisk", label: "Первомайск" },
  { value: "Slobozia", label: "Слободзея" },
  { value: "Sukleia", label: "Суклея" },
  { value: "Ternovka", label: "Терновка" },
];

// #region defineProps
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    required: true,
  },
  errors: {
    type: Object as PropType<any>,
    required: true,
  },
  selectedRubric: {
    type: String,
    required: true,
  },
  selectedSubrubric: {
    type: String,
    required: true,
  },
});
// #endregion defineProps

defineExpose({});
</script>

<template>
  <Card class="form-section">
    <h3 class="section-title">Расположение</h3>
    <div class="form-grid">
      <div v-if="selectedRubric !== 'exchange'" class="field">
        <label>Регион <span class="required">*</span></label>
        <Dropdown :options="regionOptions" modelValue="ПМР" />
      </div>
      <div class="field">
        <label>Город <span class="required">*</span></label>
        <Dropdown v-model="form.city" :options="cityOptions" />
      </div>
      <div class="field">
        <label>Улица</label>
        <Input v-model="form.address" placeholder="" />
        <span v-if="errors.address" class="error">{{ errors.address }}</span>
      </div>
      <div
        v-if="
          !['commercial', 'land'].includes(selectedSubrubric) &&
          !selectedSubrubric.startsWith('commercial') &&
          selectedRubric !== 'rent'
        "
        class="field small"
      >
        <label>Номер дома</label>
        <Input v-model="form.houseNumber" placeholder="" />
      </div>
    </div>
  </Card>
</template>
