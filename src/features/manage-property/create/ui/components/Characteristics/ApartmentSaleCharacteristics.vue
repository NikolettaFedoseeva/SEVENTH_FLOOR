<script setup lang="ts">
import { Input, Dropdown } from "@/shared/ui";

const props = defineProps<{
  form: any;
  roomsCountList: any[];
  roomTypesList: any[];
  buildingTypes: any[];
  constructionTypes: any[];
  positionInBuilding: any[];
  apartmentSeries: any[];
  bathroomTypes: any[];
  balconyTypes: any[];
  parkingTypes: any[];
  conditionTypes: any[];
  heatingTypes: any[];
}>();
</script>

<template>
  <div class="field small">
    <label>Количество комнат <span class="required">*</span></label>
    <Dropdown v-model="form.rooms" :options="roomsCountList" />
  </div>
  <div class="field small">
    <label>Тип комнат</label>
    <Dropdown v-model="form.roomType" :options="roomTypesList" />
  </div>
  <div class="field small">
    <label>Общая площадь (м²) <span class="required">*</span></label>
    <Input v-model="form.area" type="number" />
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
  </div>
  <div class="field small">
    <label>Этаж <span class="required">*</span></label>
    <Input v-model="form.floor" type="number" />
  </div>
  <div class="field small">
    <label>Этажность дома <span class="required">*</span></label>
    <Input v-model="form.totalFloors" type="number" />
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
  </div>
  <div class="field">
    <label>Балкон/лоджия</label>
    <Dropdown v-model="form.balcony" :options="balconyTypes" />
  </div>
  <div class="field">
    <label>Парковка <span class="required">*</span></label>
    <Dropdown v-model="form.parking" :options="parkingTypes" />
  </div>
  <div class="field">
    <label>Состояние квартиры <span class="required">*</span></label>
    <Dropdown v-model="form.condition" :options="conditionTypes" />
  </div>

  <div class="field">
    <label>Отопление <span class="required">*</span></label>
    <Dropdown v-model="form.heating" :options="heatingTypes" />
  </div>
</template>
