<script setup lang="ts">
import { computed } from "vue";
import { Card } from "@/shared/ui";
import { formatMoney } from "@/shared/lib/formatMoney";
import type { Property } from "../../model/types";

interface Props {
  property: Property;
}

const props = defineProps<Props>();

const formattedPrice = computed(() => formatMoney(props.property.price));
</script>

<template>
  <Card hoverable class="property-card" :padding="false">
    <div class="property-card__image-wrapper">
      <img
        :src="property.imageUrl"
        :alt="property.title"
        class="property-card__image"
      />
      <div class="property-card__price">{{ formattedPrice }}</div>
    </div>
    <div class="property-card__content">
      <h3 class="property-card__title">{{ property.title }}</h3>
      <p class="property-card__address">{{ property.address }}</p>
      <div class="property-card__features">
        <span>{{ property.rooms }} комн.</span>
        <span>•</span>
        <span>{{ property.area }} м²</span>
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
  transition: transform 0.3s;
}

.property-card:hover .property-card__image {
  transform: scale(1.05);
}

.property-card__price {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(43, 43, 43, 0.9);
  color: #fff;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-top-right-radius: 8px;
}

.property-card__content {
  padding: 1rem;
}

.property-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.property-card__address {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.property-card__features {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}
</style>
