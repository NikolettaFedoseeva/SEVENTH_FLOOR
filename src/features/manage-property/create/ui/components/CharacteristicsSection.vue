<script setup lang="ts">
import { Card, Dropdown } from "@/shared/ui";
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

const props = defineProps<{
  form: any;
  selectedRubric: string;
  selectedSubrubric: string;
}>();
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
      </div>
    </div>

    <div
      v-if="selectedRubric !== 'exchange'"
      class="form-grid pl-4 pr-4 pb-4"
      :class="
        selectedSubrubric && selectedSubrubric.startsWith('commercial')
          ? 'commercial'
          : ''
      "
    >
      <!-- ================= COMMERCIAL ================= -->
      <CommercialCharacteristics
        v-if="selectedSubrubric && selectedSubrubric.startsWith('commercial')"
        :form="form"
        :commercialTypeList="commercialTypeList"
      />

      <!-- ================= LAND ================= -->
      <LandCharacteristics
        v-else-if="selectedSubrubric === 'land'"
        :form="form"
        :landStructures="landStructures"
        :landPurpose="landPurpose"
      />

      <!-- ================= HOUSE (SALE) ================= -->
      <HouseSaleCharacteristics
        v-else-if="selectedSubrubric === 'house' && selectedRubric !== 'rent'"
        :form="form"
        :houseConditionTypes="houseConditionTypes"
        :houseFloorsList="houseFloorsList"
        :roomsCountListHouse="roomsCountListHouse"
        :bathroomTypes="bathroomTypes"
      />

      <!-- ================= HOUSE (RENT) ================= -->
      <HouseRentCharacteristics
        v-else-if="selectedSubrubric === 'house' && selectedRubric === 'rent'"
        :form="form"
        :houseConditionTypes="houseConditionTypes"
        :houseFloorsList="houseFloorsList"
        :roomsCountListHouse="roomsCountListHouse"
        :bathroomTypes="bathroomTypes"
      />

      <!-- ================= APARTMENT / ROOM (SALE) ================= -->
      <ApartmentSaleCharacteristics
        v-else-if="
          ['apartment', 'room'].includes(selectedSubrubric) &&
          selectedRubric !== 'rent'
        "
        :form="form"
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
          ['apartment', 'room'].includes(selectedSubrubric) &&
          selectedRubric === 'rent'
        "
        :form="form"
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
