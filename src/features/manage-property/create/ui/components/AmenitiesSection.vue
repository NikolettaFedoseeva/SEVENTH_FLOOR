<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Card } from "@/shared/ui";
import {
  amenitiesList,
  houseAmenitiesList,
  nearHouseList,
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
});
// #endregion defineProps

// #region computed
const currentAmenitiesList = computed<any[]>(() => {
  if (props.selectedSubrubric === "house") {
    return houseAmenitiesList;
  }
  return amenitiesList;
});
// #endregion computed

defineExpose({});
</script>

<template>
  <Card
    v-if="
      selectedRubric !== 'exchange' &&
      !selectedSubrubric.startsWith('commercial') &&
      !selectedSubrubric.startsWith('land') &&
      selectedSubrubric !== 'garage'
    "
    class="form-section mt-4"
    :padding="false"
  >
    <div class="section-header">
      <h3 class="section-title">Дополнительно</h3>
    </div>

    <div class="form-grid pl-4 pr-4 pb-4">
      <div class="field">
        <label>Дополнительно</label>
        <div class="checkbox-group-vertical">
          <label
            v-for="amenity in currentAmenitiesList"
            :key="amenity.value"
            class="checkbox-label-sm"
          >
            <input
              type="checkbox"
              :value="amenity.value"
              v-model="form.amenities"
            />
            {{ amenity.label }}
          </label>
        </div>
      </div>

      <div class="field">
        <label>Рядом с домом</label>
        <div class="checkbox-group-vertical">
          <label
            v-for="place in nearHouseList"
            :key="place.value"
            class="checkbox-label-sm"
          >
            <input
              type="checkbox"
              :value="place.value"
              v-model="form.amenities"
            />
            {{ place.label }}
          </label>
        </div>
      </div>
    </div>
  </Card>
</template>
