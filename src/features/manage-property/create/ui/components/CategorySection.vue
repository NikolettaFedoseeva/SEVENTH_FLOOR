<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Card } from "@/shared/ui";
import { rubrics } from "../../model/options";
import type { PropertyType } from "@/entities/property/model/types";

// #region defineProps
const props = defineProps({
  selectedRubric: {
    type: String,
    required: true,
  },
  selectedSubrubric: {
    type: String as PropType<PropertyType>,
    required: true,
  },
});
// #endregion defineProps

// #region defineEmits
const emit = defineEmits<{
  (e: "update:selectedRubric", value: string): void;
  (e: "update:selectedSubrubric", value: PropertyType): void;
}>();
// #endregion defineEmits

// #region computed
const subrubrics = computed<{ value: string; label: string }[]>(() => {
  let prefix = "Аренда";
  if (props.selectedRubric === "sale") prefix = "Продажа";
  if (props.selectedRubric === "exchange") prefix = "Обмен";

  return [
    { value: "apartment", label: `${prefix} квартир, комнат` },
    { value: "house", label: `${prefix} домов` },
    { value: "commercial", label: `${prefix} нежилых помещений` },
    { value: "land", label: `${prefix} земельных участков` },
    { value: "garage", label: `${prefix} гаражей / парковок` },
  ];
});
// #endregion computed

defineExpose({});
</script>

<template>
  <Card class="form-section">
    <div class="category-grid">
      <div class="category-col">
        <label>Рубрика <span class="required">*</span></label>
        <div class="select-list">
          <div
            v-for="r in rubrics"
            :key="r.value"
            class="select-item"
            :class="{ active: selectedRubric === r.value }"
            @click="emit('update:selectedRubric', r.value)"
          >
            {{ r.label }}
          </div>
        </div>
      </div>
      <div v-if="selectedRubric !== 'exchange'" class="category-col">
        <label>Подрубрика <span class="required">*</span></label>
        <div class="select-list">
          <div
            v-for="s in subrubrics"
            :key="s.value"
            class="select-item"
            :class="{ active: selectedSubrubric === s.value }"
            @click="emit('update:selectedSubrubric', s.value as PropertyType)"
          >
            {{ s.label }}
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  height: 200px;
}

.category-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.select-list {
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  height: 100%;
  overflow-y: auto;
  background: white;
}

.select-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #f3f4f6;
  }

  &.active {
    background-color: #e5e7eb;
    color: #1f2937;
    font-weight: 500;
  }
}
</style>
