<script setup lang="ts">
import { type PropType } from "vue";
import { Input, Dropdown } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: { type: Object as PropType<any>, required: true },
  houseConditionTypes: { type: Array as PropType<any[]>, required: true },
  houseFloorsList: { type: Array as PropType<any[]>, required: true },
  roomsCountListHouse: { type: Array as PropType<any[]>, required: true },
  bathroomTypes: { type: Array as PropType<any[]>, required: true },
});
// #endregion defineProps

defineExpose({});
</script>

<template>
  <div class="field">
    <label>Состояние дома <span class="required">*</span></label>
    <Dropdown v-model="form.condition" :options="houseConditionTypes" />
  </div>
  <div class="field small">
    <label>Количество этажей <span class="required">*</span></label>
    <Dropdown v-model="form.totalFloors" :options="houseFloorsList" />
  </div>
  <div class="field small">
    <label>Количество комнат <span class="required">*</span></label>
    <Dropdown v-model="form.rooms" :options="roomsCountListHouse" />
  </div>
  <div class="field small">
    <label>Площадь дома (м²) <span class="required">*</span></label>
    <Input v-model="form.area" type="number" />
  </div>
  <div class="field small">
    <label>Площадь участка (сотки) <span class="required">*</span></label>
    <Input v-model="form.landArea" type="number" />
  </div>
  <div class="field small">
    <label>Жилая площадь (м²)</label>
    <Input v-model="form.livingArea" type="number" />
  </div>
  <div class="field small">
    <label>Площадь кухни (м²)</label>
    <Input v-model="form.kitchenArea" type="number" />
  </div>
  <div class="field small">
    <label>Высота потолков (см.)</label>
    <Input v-model="form.ceilingHeight" type="number" />
  </div>
  <div class="field">
    <label>Санузел</label>
    <Dropdown v-model="form.bathroom" :options="bathroomTypes" />
  </div>
</template>
