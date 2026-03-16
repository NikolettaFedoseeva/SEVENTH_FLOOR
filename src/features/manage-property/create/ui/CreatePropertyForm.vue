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
const {
  form,
  errors,
  isLoading,
  success,
  validationFailed,
  createProperty,
  resetForm,
  isEdit,
  error,
} = useCreateProperty(props.propertyId);

const mediaSectionRef = ref<any>(null);
const selectedRubric = ref<string>("sale");
const selectedSubrubric = ref<PropertyType>("apartment");

const onSubmit = async () => {
  const mediaFiles = mediaSectionRef.value?.mediaFiles || [];
  const images = mediaFiles.map((m: any) => m.file);

  // Logic to avoid double upload:
  // If the main image is also in the 'images' list, we just send its index
  const mainImageUrl = form.imageUrl;
  const mainImageIndex = mediaFiles.findIndex(
    (m: any) => m.url === mainImageUrl,
  );

  let image_url = null;
  let main_image_index = undefined;

  if (mainImageIndex !== -1) {
    // If found in current mediaFiles (which are the files being uploaded)
    main_image_index = mainImageIndex;
  } else {
    // If not found (might be an existing string URL from server during edit)
    image_url = mainImageUrl;
  }

  const video = mediaSectionRef.value?.videoFile || null;

  await createProperty(
    {
      image_url,
      images,
      video,
      main_image_index,
    },
    selectedRubric.value,
  );

  if (success.value && !isEdit) {
    mediaSectionRef.value?.clearMedia();
    selectedRubric.value = "sale";
    selectedSubrubric.value = "apartment";
  }
};
// #endregion refs

// #region computed
// --- Conditional Field Visibility ---
// Need this one for Communications block here

// const effectiveType = computed<PropertyType>(() => {
//   return selectedRubric.value === "exchange"
//     ? form.type
//     : (selectedSubrubric.value as PropertyType);
// });
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
      // in the dropdown inside CharacteristicsSection
      form.type = undefined as any;
    }

    // Default mandatory fields for certain types
    if (form.type === "land" || form.type?.startsWith("commercial")) {
      form.rooms = 0;
    }
  },
  { immediate: true },
);
// #endregion watch

defineExpose({});
</script>

<template>
  <form @submit.prevent="onSubmit" class="create-property-form f fd-col g-4">
    <CategorySection
      v-model:selectedRubric="selectedRubric"
      v-model:selectedSubrubric="selectedSubrubric"
    />

    <MediaSection :form="form" :errors="errors" ref="mediaSectionRef" />

    <LocationSection
      :form="form"
      :errors="errors"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <GeneralInfoSection :form="form" :errors="errors" />

    <CharacteristicsSection
      :form="form"
      :errors="errors"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <CommunicationsSection
      :form="form"
      :errors="errors"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <AmenitiesSection
      :form="form"
      :selectedRubric="selectedRubric"
      :selectedSubrubric="selectedSubrubric"
    />

    <div v-if="validationFailed" class="error-message-global validation-error">
      <span class="error-icon">❌</span>
      <div class="error-content">
        <strong>Форма не отправлена:</strong>
        <p>Пожалуйста, заполните все обязательные поля, отмеченные звездочкой (*).</p>
      </div>
    </div>

    <div v-if="error" class="error-message-global">
      <span class="error-icon">⚠️</span>
      <div class="error-content">
        <strong>Ошибка сохранения:</strong>
        <p>{{ error }}</p>
      </div>
    </div>

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

  .error-message-global {
    background-color: #fef2f2;
    border: 1px solid #fee2e2;
    color: #991b1b;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;

    .error-icon {
      font-size: 1.25rem;
    }

    .error-content {
      p {
        margin: 0.25rem 0 0;
        font-size: 0.9rem;
        opacity: 0.9;
      }
    }
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
