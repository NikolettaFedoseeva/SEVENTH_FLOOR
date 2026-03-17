<script setup lang="ts">
import { type PropType } from "vue";
import { Input, Dropdown } from "@/shared/ui";

// #region defineProps
const props = defineProps({
  form: { type: Object as PropType<any>, required: true },
  houseConditionTypes: { type: Array as PropType<any[]>, required: true },
  houseFloorsList: { type: Array as PropType<any[]>, required: true },
  roomsCountListHouse: { type: Array as PropType<any[]>, required: true },
  landStructures: { type: Array as PropType<any[]>, required: true },
  bathroomTypes: { type: Array as PropType<any[]>, required: true },
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
    <label>Состояние дома <span class="required">*</span></label>
    <Dropdown v-model="form.condition" :options="houseConditionTypes" />
    <span v-if="errors.condition" class="error-text">{{ errors.condition }}</span>
  </div>
  <div class="field small">
    <label>Количество этажей <span class="required">*</span></label>
    <Dropdown v-model="form.totalFloors" :options="houseFloorsList" />
    <span v-if="errors.totalFloors" class="error-text">{{ errors.totalFloors }}</span>
  </div>
  <div class="field small">
    <label>Количество комнат <span class="required">*</span></label>
    <Dropdown v-model="form.rooms" :options="roomsCountListHouse" />
    <span v-if="errors.rooms" class="error-text">{{ errors.rooms }}</span>
  </div>
  <div class="field small">
    <label>Площадь дома (м²) <span class="required">*</span></label>
    <Input v-model="form.area" type="number" />
    <span v-if="errors.area" class="error-text">{{ errors.area }}</span>
  </div>
  <div class="field small">
    <label>Площадь участка (сотки) <span class="required">*</span></label>
    <Input v-model="form.landArea" type="number" />
  </div>
  <div class="field">
    <label>Строения на участке</label>
    <Dropdown v-model="form.hasBuildings" :options="landStructures" />
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
    <span v-if="errors.bathroom" class="error-text">{{ errors.bathroom }}</span>
  </div>
</template>
