<script setup lang="ts">
import { Input, Dropdown } from "@/shared/ui";

const props = defineProps<{
  form: any;
  houseConditionTypes: any[];
  houseFloorsList: any[];
  roomsCountListHouse: any[];
  bathroomTypes: any[];
}>();
</script>

<template>
  <div class="field small">
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
    <label>Высота потолков (см)</label>
    <Input v-model="form.ceilingHeight" type="number" />
  </div>
  <div class="field">
    <label>Санузел <span class="required">*</span></label>
    <Dropdown v-model="form.bathroom" :options="bathroomTypes" />
  </div>
</template>
