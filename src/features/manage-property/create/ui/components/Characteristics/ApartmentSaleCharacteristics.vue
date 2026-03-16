<script setup lang="ts">
import { type PropType } from "vue";
import { Input, Dropdown } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: { type: Object as PropType<any>, required: true },
  roomsCountList: { type: Array as PropType<any[]>, required: true },
  roomTypesList: { type: Array as PropType<any[]>, required: true },
  buildingTypes: { type: Array as PropType<any[]>, required: true },
  constructionTypes: { type: Array as PropType<any[]>, required: true },
  positionInBuilding: { type: Array as PropType<any[]>, required: true },
  apartmentSeries: { type: Array as PropType<any[]>, required: true },
  bathroomTypes: { type: Array as PropType<any[]>, required: true },
  balconyTypes: { type: Array as PropType<any[]>, required: true },
  parkingTypes: { type: Array as PropType<any[]>, required: true },
  conditionTypes: { type: Array as PropType<any[]>, required: true },
  heatingTypes: { type: Array as PropType<any[]>, required: true },
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
});
// #endregion defineProps

defineExpose({});
</script>

<template>
  <div class="field small">
    <label>Количество комнат <span class="required">*</span></label>
    <Dropdown v-model="form.rooms" :options="roomsCountList" />
    <span v-if="errors.rooms" class="error-text">{{ errors.rooms }}</span>
  </div>
  <div class="field small">
    <label>Тип комнат</label>
    <Dropdown v-model="form.roomType" :options="roomTypesList" />
  </div>
  <div class="field small">
    <label>Общая площадь (м²) <span class="required">*</span></label>
    <Input v-model="form.area" type="number" />
    <span v-if="errors.area" class="error-text">{{ errors.area }}</span>
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
    <label>Тип дома</label>
    <Dropdown v-model="form.buildingType" :options="buildingTypes" />
  </div>
  <div class="field">
    <label>Тип строения <span class="required">*</span></label>
    <Dropdown v-model="form.constructionType" :options="constructionTypes" />
    <span v-if="errors.constructionType" class="error-text">{{ errors.constructionType }}</span>
  </div>
  <div class="field small">
    <label>Этаж <span class="required">*</span></label>
    <Input v-model="form.floor" type="number" />
    <span v-if="errors.floor" class="error-text">{{ errors.floor }}</span>
  </div>
  <div class="field small">
    <label>Этажность дома <span class="required">*</span></label>
    <Input v-model="form.totalFloors" type="number" />
    <span v-if="errors.totalFloors" class="error-text">{{ errors.totalFloors }}</span>
  </div>
  <div class="field small">
    <label>Расположение в доме</label>
    <Dropdown v-model="form.positionInBuilding" :options="positionInBuilding" />
  </div>
  <div class="field small">
    <label>Планировка</label>
    <Dropdown v-model="form.apartmentSeries" :options="apartmentSeries" />
  </div>
  <div class="field">
    <label>Санузел <span class="required">*</span></label>
    <Dropdown v-model="form.bathroom" :options="bathroomTypes" />
    <span v-if="errors.bathroom" class="error-text">{{ errors.bathroom }}</span>
  </div>
  <div class="field">
    <label>Балкон/лоджия <span class="required">*</span></label>
    <Dropdown v-model="form.balcony" :options="balconyTypes" />
    <span v-if="errors.balcony" class="error-text">{{ errors.balcony }}</span>
  </div>
  <div class="field">
    <label>Парковка <span class="required">*</span></label>
    <Dropdown v-model="form.parking" :options="parkingTypes" />
    <span v-if="errors.parking" class="error-text">{{ errors.parking }}</span>
  </div>
  <div class="field">
    <label>Состояние квартиры <span class="required">*</span></label>
    <Dropdown v-model="form.condition" :options="conditionTypes" />
    <span v-if="errors.condition" class="error-text">{{ errors.condition }}</span>
  </div>

  <div class="field">
    <label>Отопление <span class="required">*</span></label>
    <Dropdown v-model="form.heating" :options="heatingTypes" />
    <span v-if="errors.heating" class="error-text">{{ errors.heating }}</span>
  </div>
</template>
