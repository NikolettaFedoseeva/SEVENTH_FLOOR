<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePropertiesStore } from "@/entities/property";
import { storeToRefs } from "pinia";
import { Container, Button, Card } from "@/shared/ui";
import { TheHeader, TheFooter } from "@/widgets";
import { useHead } from "@unhead/vue";

const route = useRoute();
const store = usePropertiesStore();
const { properties, loading } = storeToRefs(store);

const property = computed(() => {
  const id = route.params.id;
  return properties.value.find((p) => String(p.id) === String(id));
});

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
  ],
});

onMounted(async () => {
  window.scrollTo(0, 0);
  const id = route.params.id;
  if (id) {
    await store.fetchPropertyById(id as string);
  }
});

import { getPropertyLabel } from "@/entities/property/model/dictionary";
</script>

<template>
  <div class="property-page">
    <TheHeader />
    <main class="property-page__main">
      <Container>
        <div v-if="loading" class="loading-state">
          <h2>Загрузка...</h2>
        </div>
        <div v-else-if="property" class="property-detail">
          <div class="property-detail__header">
            <h1 class="property-title">{{ property.title }}</h1>
            <div class="property-price">
              {{ property.price.toLocaleString("ru-RU") }}
              {{
                property.currency === "eur"
                  ? "€"
                  : property.currency === "mdl"
                  ? "MDL"
                  : "$"
              }}
            </div>
          </div>

          <div class="property-detail__address">
            📍 {{ property.city ? property.city + ", " : ""
            }}{{ property.address }}
          </div>

          <div class="property-detail__content">
            <div class="property-gallery">
              <img
                :src="property.imageUrl"
                :alt="property.title"
                class="property-image"
              />
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
                  <span class="spec-value">{{ property.area }} м²</span>
                </div>
                <div class="spec-row" v-if="property.rooms">
                  <span class="spec-label">Комнат</span>
                  <span class="spec-value">{{ property.rooms }}</span>
                </div>
                <div class="spec-row" v-if="property.floor">
                  <span class="spec-label">Этаж</span>
                  <span class="spec-value">
                    {{ property.floor
                    }}{{
                      property.totalFloors ? ` из ${property.totalFloors}` : ""
                    }}
                  </span>
                </div>
                <div class="spec-row" v-if="property.landArea">
                  <span class="spec-label">Участок</span>
                  <span class="spec-value">{{ property.landArea }} соток</span>
                </div>
              </Card>
            </aside>
          </div>

          <!-- Characteristics Section -->
          <div class="property-section">
            <h2 class="section-title">Характеристики</h2>
            <div class="characteristics-grid">
              <!-- Common -->
              <div class="char-item" v-if="property.buildingType">
                <span class="char-label">Тип здания</span>
                <span class="char-value">{{
                  getPropertyLabel("buildingType", property.buildingType)
                }}</span>
              </div>
              <div
                class="char-item"
                v-if="
                  property.buildingStatus && property.buildingType === 'new'
                "
              >
                <span class="char-label">Статус</span>
                <span class="char-value">{{
                  getPropertyLabel("buildingStatus", property.buildingStatus)
                }}</span>
              </div>
              <div class="char-item" v-if="property.condition">
                <span class="char-label">Состояние</span>
                <span class="char-value">{{
                  getPropertyLabel("condition", property.condition)
                }}</span>
              </div>
              <div class="char-item" v-if="property.heating">
                <span class="char-label">Отопление</span>
                <span class="char-value">{{
                  getPropertyLabel("heating", property.heating)
                }}</span>
              </div>
              <div
                class="char-item"
                v-if="property.parking && property.parking !== 'none'"
              >
                <span class="char-label">Парковка</span>
                <span class="char-value">{{
                  getPropertyLabel("parking", property.parking)
                }}</span>
              </div>
              <div class="char-item" v-if="property.ceilingHeight">
                <span class="char-label">Высота потолков</span>
                <span class="char-value">{{ property.ceilingHeight }} м</span>
              </div>

              <!-- Commercial Specific -->
              <div
                class="char-item"
                v-if="
                  property.commercialTypes && property.commercialTypes.length
                "
              >
                <span class="char-label">Назначение</span>
                <span class="char-value">{{
                  getPropertyLabel("commercialTypes", property.commercialTypes)
                }}</span>
              </div>

              <!-- Apartment Specific -->
              <div class="char-item" v-if="property.wallMaterial">
                <span class="char-label">Стены</span>
                <span class="char-value">{{
                  getPropertyLabel("wallMaterial", property.wallMaterial)
                }}</span>
              </div>
              <div class="char-item" v-if="property.apartmentSeries">
                <span class="char-label">Серия</span>
                <span class="char-value">{{
                  getPropertyLabel("apartmentSeries", property.apartmentSeries)
                }}</span>
              </div>
              <div
                class="char-item"
                v-if="property.balcony && property.balcony !== 'none'"
              >
                <span class="char-label">Балкон</span>
                <span class="char-value">{{
                  getPropertyLabel("balcony", property.balcony)
                }}</span>
              </div>
              <div class="char-item" v-if="property.bathroom">
                <span class="char-label">Санузел</span>
                <span class="char-value">{{
                  getPropertyLabel("bathroom", property.bathroom)
                }}</span>
              </div>

              <!-- House/Land Specific -->
              <div class="char-item" v-if="property.gas">
                <span class="char-label">Газ</span>
                <span class="char-value">{{
                  getPropertyLabel("gas", property.gas)
                }}</span>
              </div>
              <div class="char-item" v-if="property.water">
                <span class="char-label">Вода</span>
                <span class="char-value">{{
                  getPropertyLabel("water", property.water)
                }}</span>
              </div>
              <div class="char-item" v-if="property.sewerage">
                <span class="char-label">Канализация</span>
                <span class="char-value">{{
                  getPropertyLabel("sewerage", property.sewerage)
                }}</span>
              </div>
              <div class="char-item" v-if="property.electricity !== undefined">
                <span class="char-label">Электричество</span>
                <span class="char-value">{{
                  property.electricity ? "Есть" : "Нет"
                }}</span>
              </div>
              <div class="char-item" v-if="property.roadType">
                <span class="char-label">Дорога</span>
                <span class="char-value">{{
                  getPropertyLabel("roadType", property.roadType)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Amenities Section -->
          <div
            class="property-section"
            v-if="property.amenities && property.amenities.length"
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
          </div>

          <!-- Description -->
          <div class="property-section">
            <h2 class="section-title">Описание</h2>
            <p class="description-text">{{ property.description }}</p>
          </div>
        </div>

        <div v-else class="not-found">
          <h2>Объект не найден</h2>
          <Button to="/catalog" variant="primary">Перейти в каталог</Button>
        </div>
      </Container>
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.property-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
    padding: 4rem 0 4rem;
    background-color: #f8fafc;
  }
}

.property-detail {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__address {
    font-size: 1.125rem;
    color: #64748b;
    margin-bottom: 2rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
}

.property-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
}

.property-price {
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.property-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
