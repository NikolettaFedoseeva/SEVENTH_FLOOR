<script setup lang="ts">
import { computed } from "vue";
import { Card } from "@/shared/ui";
import { formatMoney } from "@/shared/lib/formatMoney";
import type { Property } from "../../model/types";

interface Props {
  property: Property;
}

const props = defineProps<Props>();

const formattedPrice = computed(() =>
  formatMoney(props.property.price, props.property.currency || "usd"),
);

const heatingLabel = computed(() => {
  const map: Record<string, string> = {
    central: "Центральное",
    autonomous: "Автономное",
    autonomous_house: "Авт. (дом)",
    none: "Нет",
  };
  return props.property.heating ? map[props.property.heating] : "";
});
</script>

<template>
  <Card hoverable class="property-card" :padding="false">
    <div class="property-card__image-wrapper">
      <img
        :src="property.imageUrl"
        :alt="property.title"
        class="property-card__image"
      />
      <div v-if="property.verified" class="property-card__badge">
        <span class="verified-icon">🏅</span> Проверено
      </div>
      <div class="property-card__price">{{ formattedPrice }}</div>
    </div>
    <div class="property-card__content">
      <h3 class="property-card__title">{{ property.title }}</h3>
      <p class="property-card__address">
        <span v-if="property.district" class="property-card__district">
          {{ property.district }},
        </span>
        {{ property.address }}
      </p>

      <div class="property-card__features">
        <span>{{ property.rooms }} комн.</span>
        <span class="separator">•</span>
        <span>{{ property.area }} м²</span>
        <span v-if="property.floor && property.totalFloors" class="separator">
          •
        </span>
        <span v-if="property.floor && property.totalFloors">
          {{ property.floor }}/{{ property.totalFloors }} эт.
        </span>
      </div>

      <div class="property-card__tags">
        <span v-if="heatingLabel" class="tag">{{ heatingLabel }}</span>
        <span v-if="property.buildingType === 'new'" class="tag tag--green">
          Новострой
        </span>
        <span
          v-if="property.parking && property.parking !== 'none'"
          class="tag"
        >
          Паркинг
        </span>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.property-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s;
}

.property-card:hover {
  transform: translateY(-4px);
}

.property-card__image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.property-card:hover .property-card__image {
  transform: scale(1.05);
}

.property-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(34, 197, 94, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
}

.property-card__price {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(30, 41, 59, 0.9);
  color: #fff;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border-radius: 8px;
  font-size: 1.1rem;
}

.property-card__content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.property-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.4;
}

.property-card__address {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.property-card__district {
  color: #3b82f6;
  font-weight: 500;
}

.property-card__features {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 1rem;
  align-items: center;
}

.separator {
  color: #d1d5db;
}

.property-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.tag {
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag--green {
  background-color: #dcfce7;
  color: #166534;
}
</style>
