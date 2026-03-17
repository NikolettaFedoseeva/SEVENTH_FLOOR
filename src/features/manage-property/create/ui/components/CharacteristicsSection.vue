<script setup lang="ts">
import { type PropType, computed } from "vue";
import { Card, Dropdown } from "@/shared/ui";
import {
  type PropertyType,
  SewerageType,
  GasType,
  HeatingSource,
  WaterType,
  CommercialType,
} from "@/entities/property/model/types";
import {
  propertyCategories,
  conditionTypes,
  commercialTypeList,
  roomTypesList,
  roomsCountList,
  roomsCountListHouse,
  buildingTypes,
  constructionTypes,
  positionInBuilding,
  apartmentSeries,
  bathroomTypes,
  balconyTypes,
  parkingTypes,
  heatingTypes,
  houseConditionTypes,
  landStructures,
  landPurpose,
  houseFloorsList,
} from "../../model/options";

// Import the sub-components
import CommercialCharacteristics from "./Characteristics/CommercialCharacteristics.vue";
import LandCharacteristics from "./Characteristics/LandCharacteristics.vue";
import HouseSaleCharacteristics from "./Characteristics/HouseSaleCharacteristics.vue";
import HouseRentCharacteristics from "./Characteristics/HouseRentCharacteristics.vue";
import ApartmentSaleCharacteristics from "./Characteristics/ApartmentSaleCharacteristics.vue";
import ApartmentRentCharacteristics from "./Characteristics/ApartmentRentCharacteristics.vue";

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

const effectiveType = computed<PropertyType>(() => {
  if (props.selectedRubric === "exchange") {
    return props.form.type as PropertyType;
  }
  return props.selectedSubrubric as PropertyType;
});

defineExpose({});
</script>

<template>
  <Card
    class="characteristics-section form-section bg-gray-50"
    :padding="false"
  >
    <div class="section-header">
      <h3 class="section-title">Характеристики</h3>
    </div>

    <div v-if="selectedRubric === 'exchange'" class="form-grid pl-4 pr-4 pb-4">
      <div class="field full">
        <label>Тип недвижимости <span class="required">*</span></label>
        <Dropdown v-model="form.type" :options="propertyCategories" />
        <span v-if="errors.type" class="error-text">{{ errors.type }}</span>
      </div>
    </div>

    <div
      v-if="selectedRubric !== 'exchange'"
      class="form-grid pl-4 pr-4 pb-4"
      :class="effectiveType?.startsWith('commercial') ? 'commercial' : ''"
    >
      <!-- ================= COMMERCIAL ================= -->
      <CommercialCharacteristics
        v-if="effectiveType?.startsWith('commercial')"
        :form="form"
        :errors="errors"
        :commercialTypeList="commercialTypeList"
      />

      <!-- ================= LAND ================= -->
      <LandCharacteristics
        v-else-if="effectiveType === 'land'"
        :form="form"
        :errors="errors"
        :landStructures="landStructures"
        :landPurpose="landPurpose"
      />

      <!-- ================= HOUSE (SALE/EXCHANGE) ================= -->
      <HouseSaleCharacteristics
        v-else-if="effectiveType === 'house' && selectedRubric !== 'rent'"
        :form="form"
        :errors="errors"
        :houseConditionTypes="houseConditionTypes"
        :houseFloorsList="houseFloorsList"
        :roomsCountListHouse="roomsCountListHouse"
        :bathroomTypes="bathroomTypes"
      />

      <!-- ================= HOUSE (RENT) ================= -->
      <HouseRentCharacteristics
        v-else-if="effectiveType === 'house' && selectedRubric === 'rent'"
        :form="form"
        :errors="errors"
        :houseConditionTypes="houseConditionTypes"
        :houseFloorsList="houseFloorsList"
        :roomsCountListHouse="roomsCountListHouse"
        :bathroomTypes="bathroomTypes"
      />

      <!-- ================= APARTMENT / ROOM (SALE/EXCHANGE) ================= -->
      <ApartmentSaleCharacteristics
        v-else-if="
          ['apartment', 'room'].includes(effectiveType) &&
          selectedRubric !== 'rent'
        "
        :form="form"
        :errors="errors"
        :roomsCountList="roomsCountList"
        :roomTypesList="roomTypesList"
        :buildingTypes="buildingTypes"
        :constructionTypes="constructionTypes"
        :positionInBuilding="positionInBuilding"
        :apartmentSeries="apartmentSeries"
        :bathroomTypes="bathroomTypes"
        :balconyTypes="balconyTypes"
        :parkingTypes="parkingTypes"
        :conditionTypes="conditionTypes"
        :heatingTypes="heatingTypes"
      />

      <!-- ================= APARTMENT / ROOM (RENT) ================= -->
      <ApartmentRentCharacteristics
        v-else-if="
          ['apartment', 'room'].includes(effectiveType) &&
          selectedRubric === 'rent'
        "
        :form="form"
        :errors="errors"
        :roomsCountList="roomsCountList"
        :roomTypesList="roomTypesList"
        :buildingTypes="buildingTypes"
        :apartmentSeries="apartmentSeries"
        :bathroomTypes="bathroomTypes"
        :balconyTypes="balconyTypes"
        :conditionTypes="conditionTypes"
        :parkingTypes="parkingTypes"
        :constructionTypes="constructionTypes"
        :heatingTypes="heatingTypes"
      />
    </div>
  </Card>
</template>
<style lang="scss" scoped>
.characteristics-section {
  .form-grid.commercial {
    :deep(.field) {
      justify-content: flex-start;
    }
  }
  :deep(.field) {
    justify-content: space-between;
  }
}
</style>
