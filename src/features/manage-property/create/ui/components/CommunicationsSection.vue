<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Card, Dropdown } from "@/shared/ui";
import {
  heatingSourcesList,
  waterSourcesList,
  sewerageTypes,
  gasTypes,
} from "../../model/options";

// #region defineProps
const props = defineProps({
  form: {
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
  errors: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
});
// #endregion defineProps

// #region computed
const showCommunications = computed<boolean>(() =>
  ["house", "land"].includes(props.selectedSubrubric),
);
const isLand = computed<boolean>(() => props.selectedSubrubric === "land");
// #endregion computed

defineExpose({});
</script>

<template>
  <Card
    v-if="showCommunications && selectedRubric !== 'exchange'"
    class="form-section bg-gray-50 mt-4"
    :padding="false"
  >
    <div class="section-header">
      <h3 class="section-title">
        {{ isLand ? "Коммуникации и подъезд" : "Коммуникации" }}
      </h3>
    </div>
    <!-- LAND -->
    <div v-if="isLand" class="form-grid pl-4 pr-4 pb-4">
      <div class="field">
        <label>Коммуникации</label>
        <div class="checkbox-group-vertical">
          <label class="checkbox-label-sm">
            <input type="checkbox" value="gas" v-model="form.amenities" />
            Газ
          </label>
          <label class="checkbox-label-sm">
            <input type="checkbox" value="water" v-model="form.water" />
            Водопровод
          </label>
          <label class="checkbox-label-sm">
            <input type="checkbox" value="sewerage" v-model="form.amenities" />
            Канализация
          </label>
          <label class="checkbox-label-sm">
            <input type="checkbox" v-model="form.electricity" />
            Электричество
          </label>
          <label class="checkbox-label-sm">
            <input type="checkbox" value="phone" v-model="form.amenities" />
            Телефон
          </label>
        </div>
      </div>

      <div class="field">
        <label>Подъезд</label>
        <div class="checkbox-group-vertical">
          <label class="checkbox-label-sm">
            <input type="checkbox" value="asphalt" v-model="form.roadType" />
            асфальтированная дорога
          </label>
          <label class="checkbox-label-sm">
            <input type="checkbox" value="dirt" v-model="form.roadType" />
            грунтовая дорога
          </label>
        </div>
      </div>
    </div>

    <!-- HOUSE -->
    <div v-else class="form-grid pl-4 pr-4 pb-4">
      <!-- Heating Checkboxes -->
      <div class="field">
        <label>Отопление <span class="required">*</span></label>
        <div class="checkbox-group-vertical">
          <label
            v-for="s in heatingSourcesList"
            :key="s.value"
            class="checkbox-label-sm"
          >
            <input
              type="checkbox"
              :value="s.value"
              v-model="form.heatingSources"
            />
            {{ s.label }}
          </label>
        </div>
        <span v-if="errors.heatingSources" class="error-text">{{ errors.heatingSources }}</span>
      </div>

      <!-- Electricity / Water -->
      <div class="field">
        <label>Электричество</label>
        <label class="checkbox-label-sm">
          <input type="checkbox" v-model="form.electricity" />
          подключено
        </label>

        <div class="mt-4">
          <label class="block-label">Вода</label>
          <div class="checkbox-group-vertical">
            <label
              v-for="w in waterSourcesList"
              :key="w.value"
              class="checkbox-label-sm"
            >
              <input type="checkbox" :value="w.value" v-model="form.water" />
              {{ w.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Sewerage / Internet -->
      <div class="field">
        <label>Канализация</label>
        <Dropdown v-model="form.sewerage" :options="sewerageTypes" />

        <div class="mt-4">
          <label class="block-label">Телефон, ТВ, интернет</label>
          <div class="checkbox-group-vertical">
            <label class="checkbox-label-sm">
              <input type="checkbox" value="phone" v-model="form.amenities" />
              телефон
            </label>
            <label class="checkbox-label-sm">
              <input
                type="checkbox"
                value="cable_tv"
                v-model="form.amenities"
              />
              ТВ
            </label>
            <label class="checkbox-label-sm">
              <input
                type="checkbox"
                value="internet"
                v-model="form.amenities"
              />
              интернет
            </label>
          </div>
        </div>
      </div>

      <!-- Gas -->
      <div class="field">
        <label>Газ</label>
        <Dropdown v-model="form.gas" :options="gasTypes" />
      </div>
    </div>
  </Card>
</template>
