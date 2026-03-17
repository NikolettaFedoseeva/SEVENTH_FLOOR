<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePropertiesStore } from "@/entities/property";
import { storeToRefs } from "pinia";
import { Container, Button, Card, MediaLightbox } from "@/shared/ui";
import { useHead } from "@unhead/vue";
import { getPropertyLabel } from "@/entities/property/model/dictionary";
import type { Property } from "@/entities/property/model/types";

// #region constants
const RELEVANT_FIELDS: Record<string, string[]> = {
  apartment: [
    "condition",
    "heating",
    "roomType",
    "positionInBuilding",
    "apartmentSeries",
    "bathroom",
    "balcony",
    "parking",
    "constructionType",
    "buildingType",
    "floor",
    "totalFloors",
    "ceilingHeight",
    "amenities",
  ],
  room: [
    "condition",
    "heating",
    "positionInBuilding",
    "apartmentSeries",
    "bathroom",
    "balcony",
    "parking",
    "constructionType",
    "buildingType",
    "floor",
    "totalFloors",
    "ceilingHeight",
    "amenities",
  ],
  house: [
    "condition",
    "heatingSources",
    "ceilingHeight",
    "bathroom",
    "landArea",
    "hasBuildings",
    "totalFloors",
    "rooms",
    "sewerage",
    "gas",
    "water",
    "electricity",
    "amenities",
  ],
  dacha: [
    "condition",
    "heatingSources",
    "ceilingHeight",
    "bathroom",
    "landArea",
    "hasBuildings",
    "totalFloors",
    "rooms",
    "sewerage",
    "gas",
    "water",
    "electricity",
    "amenities",
  ],
  land: [
    "landArea",
    "hasBuildings",
    "landType",
    "roadType",
    "gas",
    "water",
    "sewerage",
    "electricity",
    "amenities",
  ],
  commercial: ["commercialTypes"],
  garage: ["commercialTypes"],
  other: ["condition"],
};
// #endregion constants

// #region refs
const route = useRoute();
const router = useRouter();
const store = usePropertiesStore();
const { properties, loading } = storeToRefs(store);
// Lightbox state
const showLightbox = ref(false);
const lightboxIndex = ref(0);
// #endregion refs

// #region computed
const mediaItems = computed(() => {
  const items: { url: string; type: "image" | "video" }[] = [];
  if (!property.value) return items;

  const seen = new Set<string>();

  const addUnique = (
    url: string | null | undefined,
    type: "image" | "video",
  ) => {
    if (!url || typeof url !== "string") return;

    // Aggressive normalization for comparison
    const normalized = url
      .trim()
      .replace(/\\/g, "/") // Convert backslashes to forward slashes
      .split("?")[0] // Remove query parameters
      .replace(/^blob:/, "")
      .replace(/^https?:\/\/[^/]+/, "")
      .replace(/^\/?uploads\//, "")
      .replace(/^\//, "");

    if (!normalized) return;

    if (!seen.has(normalized)) {
      seen.add(normalized);
      items.push({ url, type });
    }
  };

  // 1. Add main image first
  if (property.value.imageUrl) {
    addUnique(property.value.imageUrl, "image");
  }

  // 2. Add gallery images
  if (property.value.images && Array.isArray(property.value.images)) {
    property.value.images.forEach((img) => addUnique(img, "image"));
  }

  // 3. Add video if exists
  if (property.value.videoUrl) {
    addUnique(property.value.videoUrl, "video");
  }

  return items;
});
// #endregion computed

// #endregion refs

// #region Функции
const goBack = () => {
  router.back();
};

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  showLightbox.value = true;
};

const isFieldRelevant = (fieldName: string): boolean => {
  if (!property.value) return false;
  const type = property.value.type as string;
  // Normalize commercial subrubrics to 'commercial'
  const baseType = type.startsWith("commercial") ? "commercial" : type;
  const fields = RELEVANT_FIELDS[baseType];
  return fields ? fields.includes(fieldName) : true;
};
// #endregion Функции

// #region computed
const property = computed<Property | undefined>(() => {
  const id = route.params.id;
  const p = properties.value.find((p: Property) => String(p.id) === String(id));
  if (p && p.price && p.area) {
    p.pricePerM2 = Math.round(p.price / p.area);
  }
  return p;
});
// #endregion computed

// #region Хуки жизненного цикла
useHead({
  title: computed(() => property.value?.title || "Загрузка..."),
  meta: [
    {
      name: "description",
      content: computed(
        () =>
          property.value?.description?.slice(0, 160) ||
          "Подробная информация об объекте недвижимости.",
      ),
    },
    // Open Graph
    {
      property: "og:title",
      content: computed(() => property.value?.title || "Загрузка..."),
    },
    {
      property: "og:description",
      content: computed(() => property.value?.description?.slice(0, 160) || ""),
    },
    {
      property: "og:image",
      content: computed(() => property.value?.imageUrl || ""),
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: computed(() => window.location.href),
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: computed(() => property.value?.title || ""),
    },
    {
      name: "twitter:description",
      content: computed(() => property.value?.description?.slice(0, 160) || ""),
    },
    {
      name: "twitter:image",
      content: computed(() => property.value?.imageUrl || ""),
    },
  ],
  link: [
    {
      rel: "canonical",
      href: computed(() => window.location.href),
    },
  ],
});

onMounted(async () => {
  window.scrollTo(0, 0);
  const id = route.params.id;
  if (id) {
    await store.fetchPropertyById(id as string);
  }
});
// #endregion Хуки жизненного цикла

defineExpose({});
</script>

<template>
  <div class="property-page">
    <main class="property-page__main">
      <Container>
        <div class="property-page__navigation">
          <button @click="goBack" class="back-button">
            <span class="back-icon">←</span> Назад
          </button>
        </div>

        <div v-if="loading" class="loading-state">
          <h2>Загрузка...</h2>
        </div>
        <div v-else-if="property" class="property-detail">
          <div class="property-detail__header">
            <h1 class="property-title">{{ property.title }}</h1>
            <div class="property-detail__price">
              <div class="price-main">
                {{ property.price.toLocaleString("ru-RU") }}
                {{
                  property.currency === "eur"
                    ? "€"
                    : property.currency === "mdl"
                    ? "MDL"
                    : "$"
                }}
                <span class="price-badge" v-if="property.rentPeriod">{{
                  getPropertyLabel("rentPeriod", property.rentPeriod)
                }}</span>
              </div>
            </div>
          </div>

          <div class="property-detail__address">
            📍 {{ property.city ? property.city + ", " : ""
            }}{{ property.district ? property.district + ", " : ""
            }}{{ property.address }}
          </div>

          <div class="property-detail__content">
            <div class="property-gallery">
              <div class="gallery-main" v-if="mediaItems.length > 0">
                <template v-if="mediaItems[0].type === 'image'">
                  <img
                    :src="mediaItems[0].url"
                    :alt="property.title"
                    class="property-image clickable"
                    @click="openLightbox(0)"
                    loading="lazy"
                  />
                </template>
                <div
                  v-else
                  class="video-container clickable"
                  @click="openLightbox(0)"
                >
                  <div class="video-overlay">
                    <div class="play-button-large">▶</div>
                  </div>
                  <video preload="metadata" class="property-video-player">
                    <source :src="mediaItems[0].url" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div v-if="mediaItems.length > 1" class="gallery-grid">
                <div
                  v-for="(item, index) in mediaItems.slice(1)"
                  :key="index"
                  class="gallery-item"
                  @click="openLightbox(index + 1)"
                >
                  <img
                    v-if="item.type === 'image'"
                    :src="item.url"
                    :alt="property.title + ' ' + (index + 2)"
                    class="clickable"
                    loading="lazy"
                  />
                  <div v-else class="video-thumbnail">
                    <div class="thumbnail-overlay">
                      <span class="play-icon-sm">▶</span>
                    </div>
                    <video preload="metadata">
                      <source :src="item.url" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <aside class="property-sidebar">
              <Card class="property-specs">
                <div class="spec-row">
                  <span class="spec-label">Тип</span>
                  <span class="spec-value">{{
                    getPropertyLabel("type", property.type)
                  }}</span>
                </div>
                <div class="spec-row" v-if="property.area">
                  <span class="spec-label">Площадь</span>
                  <div class="spec-value-group">
                    <span class="spec-value">{{ property.area }} м²</span>
                    <span v-if="property.livingArea" class="spec-subvalue"
                      >Жилая: {{ property.livingArea }} м²</span
                    >
                    <span v-if="property.kitchenArea" class="spec-subvalue"
                      >Кухня: {{ property.kitchenArea }} м²</span
                    >
                  </div>
                </div>
                <div
                  class="spec-row"
                  v-if="property.rooms && Number(property.rooms) > 0"
                >
                  <span class="spec-label">Комнат</span>
                  <span class="spec-value">{{ property.rooms }}</span>
                </div>
                <div class="spec-row" v-if="property.floor">
                  <span class="spec-label">Этаж</span>
                  <span class="spec-value">
                    {{ property.floor
                    }}{{
                      property.totalFloors ? " / " + property.totalFloors : ""
                    }}
                  </span>
                </div>
              </Card>
            </aside>
          </div>

          <section class="property-section" v-if="property.description">
            <h2 class="section-title">Описание</h2>
            <p class="description-text">{{ property.description }}</p>
          </section>

          <section class="property-section">
            <h2 class="section-title">Характеристики</h2>
            <div class="characteristics-grid">
              <div
                v-if="isFieldRelevant('condition') && property.condition"
                class="char-item"
              >
                <span class="char-label">Состояние</span>
                <span class="char-value">{{
                  getPropertyLabel("condition", property.condition)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('heating') &&
                  property.heating &&
                  (property.heating !== 'none' ||
                    !property.heatingSources ||
                    !property.heatingSources.length)
                "
                class="char-item"
              >
                <span class="char-label">Отопление</span>
                <span class="char-value">{{
                  getPropertyLabel("heating", property.heating)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('heatingSources') &&
                  property.heatingSources &&
                  property.heatingSources.length
                "
                class="char-item"
              >
                <span class="char-label">Источник отопления</span>
                <span class="char-value">{{
                  getPropertyLabel("heatingSources", property.heatingSources)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('roomType') && property.roomType"
                class="char-item"
              >
                <span class="char-label">Тип комнат</span>
                <span class="char-value">{{
                  getPropertyLabel("roomTypes", property.roomType)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('wallMaterial') && property.wallMaterial"
                class="char-item"
              >
                <span class="char-label">Материал стен</span>
                <span class="char-value">{{
                  getPropertyLabel("wallMaterial", property.wallMaterial)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('ceilingHeight') && property.ceilingHeight
                "
                class="char-item"
              >
                <span class="char-label">Высота потолков</span>
                <span class="char-value">{{ property.ceilingHeight }} м</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('positionInBuilding') &&
                  property.positionInBuilding
                "
                class="char-item"
              >
                <span class="char-label">Расположение в доме</span>
                <span class="char-value">{{
                  getPropertyLabel(
                    "positionInBuilding",
                    property.positionInBuilding,
                  )
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('apartmentSeries') && property.apartmentSeries
                "
                class="char-item"
              >
                <span class="char-label">Планировка</span>
                <span class="char-value">{{
                  getPropertyLabel("apartmentSeries", property.apartmentSeries)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('bathroom') && property.bathroom"
                class="char-item"
              >
                <span class="char-label">Санузел</span>
                <span class="char-value">{{
                  getPropertyLabel("bathroom", property.bathroom)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('balcony') && property.balcony"
                class="char-item"
              >
                <span class="char-label">Балкон / Лоджия</span>
                <span class="char-value">{{
                  getPropertyLabel("balcony", property.balcony)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('parking') && property.parking"
                class="char-item"
              >
                <span class="char-label">Парковка</span>
                <span class="char-value">{{
                  getPropertyLabel("parking", property.parking)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('constructionType') &&
                  property.constructionType
                "
                class="char-item"
              >
                <span class="char-label">Тип постройки</span>
                <span class="char-value">{{
                  getPropertyLabel(
                    "constructionType",
                    property.constructionType,
                  )
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('buildingType') && property.buildingType"
                class="char-item"
              >
                <span class="char-label">Тип здания</span>
                <span class="char-value">{{
                  getPropertyLabel("buildingType", property.buildingType)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('buildingStatus') && property.buildingStatus
                "
                class="char-item"
              >
                <span class="char-label">Статус здания</span>
                <span class="char-value">{{
                  getPropertyLabel("buildingStatus", property.buildingStatus)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('layout') && property.layout"
                class="char-item"
              >
                <span class="char-label">Планировка</span>
                <span class="char-value">{{
                  getPropertyLabel("layout", property.layout)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('landArea') && property.landArea"
                class="char-item"
              >
                <span class="char-label">Площадь участка</span>
                <span class="char-value">{{ property.landArea }} соток</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('sewerage') &&
                  property.sewerage &&
                  property.sewerage !== 'none'
                "
                class="char-item"
              >
                <span class="char-label">Канализация</span>
                <span class="char-value">{{
                  getPropertyLabel("sewerage", property.sewerage)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('gas') &&
                  property.gas &&
                  property.gas !== 'none'
                "
                class="char-item"
              >
                <span class="char-label">Газ</span>
                <span class="char-value">{{
                  getPropertyLabel("gas", property.gas)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('water') &&
                  property.water &&
                  property.water.length
                "
                class="char-item"
              >
                <span class="char-label">Водоснабжение</span>
                <span class="char-value">{{
                  getPropertyLabel("water", property.water)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('electricity') && property.electricity"
                class="char-item"
              >
                <span class="char-label">Электричество</span>
                <span class="char-value">Подключено</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('hasBuildings') &&
                  property.hasBuildings &&
                  property.hasBuildings !== 'none'
                "
                class="char-item"
              >
                <span class="char-label">Строения на участке</span>
                <span class="char-value">{{
                  getPropertyLabel("hasBuildings", property.hasBuildings)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('landType') && property.landType"
                class="char-item"
              >
                <span class="char-label">Тип участка</span>
                <span class="char-value">{{
                  getPropertyLabel("landType", property.landType)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('roadType') &&
                  property.roadType &&
                  property.roadType.length
                "
                class="char-item"
              >
                <span class="char-label">Подъезд</span>
                <span class="char-value">{{
                  getPropertyLabel("roadType", property.roadType)
                }}</span>
              </div>
              <div
                v-if="
                  isFieldRelevant('commercialTypes') &&
                  property.commercialTypes &&
                  property.commercialTypes.length
                "
                class="char-item"
              >
                <span class="char-label">Специализация</span>
                <span class="char-value">{{
                  getPropertyLabel("commercialTypes", property.commercialTypes)
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('floor') && property.floor"
                class="char-item"
              >
                <span class="char-label">Этаж</span>
                <span class="char-value">{{
                  getPropertyLabel("floor", String(property.floor))
                }}</span>
              </div>
              <div
                v-if="isFieldRelevant('totalFloors') && property.totalFloors"
                class="char-item"
              >
                <span class="char-label">Этажность</span>
                <span class="char-value">{{
                  getPropertyLabel("totalFloors", String(property.totalFloors))
                }}</span>
              </div>
              <!-- <div v-if="property.source" class="char-item">
                <span class="char-label">Источник</span>
                <span class="char-value">{{ getPropertyLabel("source", property.source) }}</span>
              </div>
              <div v-if="property.verified" class="char-item">
                <span class="char-label">Проверено</span>
                <span class="char-value">Да</span>
              </div> -->
            </div>
          </section>

          <section
            class="property-section"
            v-if="
              isFieldRelevant('amenities') &&
              property.amenities &&
              property.amenities.length
            "
          >
            <h2 class="section-title">Удобства</h2>
            <div class="amenities-list">
              <span
                v-for="amenity in property.amenities"
                :key="amenity"
                class="amenity-tag"
              >
                {{ getPropertyLabel("amenities", amenity) }}
              </span>
            </div>
          </section>
        </div>
        <div v-else class="not-found">
          <h2>Объект не найден</h2>
          <Button variant="primary" @click="router.push('/catalog')"
            >Вернуться в каталог</Button
          >
        </div>
      </Container>
    </main>
    <MediaLightbox
      v-if="property"
      v-model="showLightbox"
      :items="mediaItems"
      :initial-index="lightboxIndex"
    />
  </div>
</template>

<style lang="scss" scoped>
.property-page {
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 2rem 0;

  &__navigation {
    margin-bottom: 1.5rem;
  }
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  color: #475569;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #1e293b;
    transform: translateX(-4px);
  }

  .back-icon {
    font-size: 1.1rem;
  }
}

.property-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }

  &__price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    white-space: nowrap;

    @media (max-width: 768px) {
      align-items: flex-start;
    }
  }

  &__address {
    font-size: 1.25rem;
    color: #64748b;
    margin-bottom: 2rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 3rem;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
  }
}

.property-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
}

.price-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.25rem;
  font-weight: 800;
  color: #2563eb;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
}

.price-badge {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 999px;
  text-transform: uppercase;
}

.property-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-main {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.clickable {
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.95;
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.gallery-item {
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.property-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 2rem;
  height: max-content;
}

.contact-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.agent-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.agent-name {
  font-weight: 700;
  font-size: 1.125rem;
  color: #0f172a;
}

.agent-status {
  font-size: 0.875rem;
  color: #64748b;
}

.contact-btn {
  font-size: 1.125rem;
  padding: 1rem;
  font-weight: 700;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
}

.play-button-large {
  width: 80px;
  height: 80px;
  background: rgba(37, 99, 235, 0.9);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding-left: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

.property-video-player {
  width: 100%;
  height: 100%;
  max-height: 500px;
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.play-icon-sm {
  width: 32px;
  height: 32px;
  background: rgba(37, 99, 235, 0.9);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  padding-left: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.property-specs {
  padding: 1.5rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
}

.spec-label {
  color: #64748b;
  font-weight: 500;
}

.spec-value {
  font-weight: 700;
  color: #0f172a;
}

.spec-value-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.spec-subvalue {
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
}

.property-section {
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.char-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.char-label {
  font-size: 0.875rem;
  color: #64748b;
}

.char-value {
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;
}

.amenities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.amenity-tag {
  background-color: #f1f5f9;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.description-text {
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.8;
  white-space: pre-line;
}

.not-found,
.loading-state {
  text-align: center;
  padding: 4rem;

  h2 {
    margin-bottom: 2rem;
    color: #64748b;
  }
}

.loading-state {
  color: #64748b;
}
</style>
