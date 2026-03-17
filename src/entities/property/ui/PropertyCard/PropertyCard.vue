<script setup lang="ts">
import { computed, type PropType } from "vue";
import { Card } from "@/shared/ui";
import { formatMoney } from "@/shared/lib/formatMoney";
import type { Property } from "../../model/types";
import { useFavorites } from "../../model/useFavorites";

// #region defineProps
const props = defineProps({
  property: {
    type: Object as PropType<Property>,
    required: true,
  },
});
// #endregion defineProps

const { isFavorite, toggleFavorite } = useFavorites();

// #region computed
const formattedPrice = computed<string>(() =>
  formatMoney(props.property.price, props.property.currency || "usd"),
);

const heatingLabel = computed<string>(() => {
  const map: Record<string, string> = {
    central: "Центральное",
    autonomous: "Автономное",
    autonomous_house: "Авт. (дом)",
    none: "Нет",
  };
  return props.property.heating ? map[props.property.heating] : "";
});

const uniquePhotoCount = computed(() => {
  const photos = new Set<string>();

  const normalize = (url: string) =>
    url
      .replace(/^blob:/, "")
      .replace(/^https?:\/\/[^/]+/, "")
      .replace(/^\/uploads\//, "")
      .replace(/^[/]+/, "");

  if (props.property.imageUrl) {
    photos.add(normalize(props.property.imageUrl));
  }
  if (props.property.images) {
    props.property.images.forEach((img) => {
      photos.add(normalize(img));
    });
  }
  return photos.size;
});
// #endregion computed

defineExpose({});
</script>

<template>
  <router-link :to="`/catalog/${property.id}`" class="property-card-link">
    <Card hoverable class="property-card" :padding="false">
      <div class="property-card__image-wrapper">
        <img
          :src="property.imageUrl"
          :alt="property.title"
          class="property-card__image"
          loading="lazy"
        />

        <!-- <button 
          class="favorite-btn" 
          :class="{ 'is-active': isFavorite(property.id) }"
          @click.stop.prevent="toggleFavorite(property.id)"
          :title="isFavorite(property.id) ? 'Удалить из избранного' : 'Добавить в избранное'"
        >
          <span v-if="isFavorite(property.id)">❤️</span>
          <span v-else>🤍</span>
        </button> -->

        <div class="property-card__overlay"></div>
        <div class="property-card__price-tag">{{ formattedPrice }}</div>
      </div>
      <div class="property-card__content">
        <div class="property-card__header">
          <h3 class="property-card__title">{{ property.title }}</h3>
          <span v-if="property.buildingType === 'new'" class="new-build-badge"
            >New</span
          >
        </div>

        <p class="property-card__address">
          <span class="location-icon">📍</span>
          <span v-if="property.district" class="property-card__district">
            {{ property.district }},
          </span>
          {{ property.address }}
        </p>

        <div class="property-card__features">
          <div class="feature-item">
            <span class="feature-value">{{ property.rooms }}</span>
            <span class="feature-label">комн.</span>
          </div>
          <div class="feature-item">
            <span class="feature-value">{{ property.area }}</span>
            <span class="feature-label">м²</span>
          </div>
          <div
            v-if="property.floor && property.totalFloors"
            class="feature-item"
          >
            <span class="feature-value"
              >{{ property.floor }}/{{ property.totalFloors }}</span
            >
            <span class="feature-label">эт.</span>
          </div>
        </div>

        <div class="property-card__footer">
          <div class="property-card__tags">
            <span v-if="heatingLabel" class="tag">{{ heatingLabel }}</span>
            <span
              v-if="property.parking && property.parking !== 'none'"
              class="tag"
            >
              Паркинг
            </span>
          </div>
          <div class="property-card__arrow">→</div>
        </div>
      </div>
    </Card>
  </router-link>
</template>

<style lang="scss" scoped>
.property-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.property-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f1f5f9;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #3b82f6;

    .property-card__image {
      transform: scale(1.1);
    }

    .property-card__arrow {
      transform: translateX(4px);
      color: #3b82f6;
    }

    .property-card__overlay {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0) 50%
      );
    }
  }

  &__image-wrapper {
    position: relative;
    height: 220px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .favorite-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1.2rem;
    padding: 0;

    &:hover {
      transform: scale(1.1);
      background: white;
    }

    &.is-active {
      background: white;
    }
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 40%
    );
    transition: background 0.3s;
    pointer-events: none;
  }

  &__price-tag {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: #2563eb;
    color: #fff;
    padding: 6px 14px;
    font-weight: 800;
    border-radius: 10px;
    font-size: 1.15rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  &__content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.75rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.3;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }

  .new-build-badge {
    background: #dcfce7;
    color: #166534;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__address {
    margin: 0;
    font-size: 0.9rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 4px;

    .location-icon {
      font-size: 0.8rem;
    }
  }

  &__district {
    color: #3b82f6;
    font-weight: 600;
  }

  &__features {
    display: flex;
    gap: 1.25rem;
    margin: 0.25rem 0;
  }

  .feature-item {
    display: flex;
    align-items: baseline;
    gap: 3px;
  }

  .feature-value {
    font-weight: 700;
    font-size: 1rem;
    color: #1e293b;
  }

  .feature-label {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &__arrow {
    font-size: 1.25rem;
    color: #cbd5e1;
    transition: all 0.2s;
    font-weight: 300;
  }
}

.tag {
  background-color: #f1f5f9;
  color: #475569;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
}
</style>
