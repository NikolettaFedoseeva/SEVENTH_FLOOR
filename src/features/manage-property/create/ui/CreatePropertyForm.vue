<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useCreateProperty } from "../model/useCreateProperty";
import { Button, Input, Card } from "@/shared/ui";
import type {
  PropertyType,
  SewerageType,
  GasType,
  HeatingSource,
  WaterType,
  CommercialType,
} from "@/entities/property/model/types";

import {} from "../model/options";

import CategorySection from "./components/CategorySection.vue";
import CharacteristicsSection from "./components/CharacteristicsSection.vue";
import CommunicationsSection from "./components/CommunicationsSection.vue";
import LocationSection from "./components/LocationSection.vue";
import AmenitiesSection from "./components/AmenitiesSection.vue";
import GeneralInfoSection from "./components/GeneralInfoSection.vue";
import MediaSection from "./components/MediaSection.vue";

// #region defineProps
const props = defineProps({
  propertyId: {
    type: String,
    default: undefined,
  },
});
// #endregion defineProps

// #region refs
const { form, errors, isLoading, success, createProperty, isEdit } =
  useCreateProperty(props.propertyId);

const selectedRubric = ref<string>("sale");
const selectedSubrubric = ref<PropertyType>("apartment");
// #endregion refs

// #region computed
// --- Conditional Field Visibility ---
// Need this one for Communications block here
const showCommunications = computed<boolean>(() =>
  ["house"].includes(form.type as string),
);
// #endregion computed

// #region watch
// Update form model when selection changes
watch(
  [selectedRubric, selectedSubrubric],
  ([rubric, subrubric]) => {
    // Map rubric to rentPeriod
    if (rubric === "sale" || rubric === "exchange") form.rentPeriod = "sale";
    else form.rentPeriod = "monthly";

    // Map subrubric to type
    if (rubric !== "exchange") {
      form.type = subrubric as PropertyType;
    } else {
      // For exchange, reset type so user has to select it
      form.type = undefined as any;
    }
  },
  { immediate: true },
);
// #endregion watch

defineExpose({});
</script>

<template>
  <form
    @submit.prevent="createProperty"
    class="create-property-form f fd-col g-4"
  >
    <CategorySection
      v-model:selectedRubric="selectedRubric"
      v-model:selectedSubrubric="selectedSubrubric"
    />

    <MediaSection :form="form" />

    <LocationSection
      :form="form"
      :errors="errors"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <GeneralInfoSection :form="form" :errors="errors" />

    <CharacteristicsSection
      :form="form"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <CommunicationsSection
      :form="form"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <AmenitiesSection
      :form="form"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <div v-if="success" class="success-message">
      {{ isEdit ? "Объект успешно обновлен!" : "Объект успешно добавлен!" }}
    </div>

    <div class="form-actions">
      <Button type="submit" variant="primary" :disabled="isLoading">
        {{
          isLoading
            ? "Сохранение..."
            : isEdit
            ? "Сохранить изменения"
            : "Добавить объект"
        }}
      </Button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.create-property-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .success-message {
    background-color: #f0fdf4;
    color: #166534;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
}
</style>
