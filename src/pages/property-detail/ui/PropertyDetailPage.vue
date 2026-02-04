<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePropertiesStore } from "@/entities/property";
import { storeToRefs } from "pinia";
import { Container, Button, Card } from "@/shared/ui";
import { TheHeader, TheFooter } from "@/widgets";

const route = useRoute();
const store = usePropertiesStore();
const { properties } = storeToRefs(store);

const property = computed(() => {
  const id = route.params.id;
  return properties.value.find((p) => String(p.id) === String(id));
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="property-page">
    <TheHeader />
    <main class="property-page__main">
      <Container>
        <div v-if="property" class="property-detail">
          <div class="property-detail__header">
            <h1 class="property-title">{{ property.title }}</h1>
            <div class="property-price">
              {{ property.price.toLocaleString("ru-RU") }} ₽
            </div>
          </div>

          <div class="property-detail__address">📍 {{ property.address }}</div>

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
                  <span class="spec-label">Площадь</span>
                  <span class="spec-value">{{ property.area }} м²</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Комнат</span>
                  <span class="spec-value">{{ property.rooms }}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Тип</span>
                  <span class="spec-value">{{
                    property.type === "apartment"
                      ? "Квартира"
                      : property.type === "house"
                      ? "Дом"
                      : "Коммерческая"
                  }}</span>
                </div>

                <div class="action-buttons">
                  <Button variant="primary" block>Позвонить агенту</Button>
                  <Button variant="outline" block
                    >Записаться на просмотр</Button
                  >
                </div>
              </Card>
            </aside>
          </div>

          <div class="property-description">
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

<style scoped>
.property-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.property-page__main {
  flex: 1;
  padding: 120px 0 4rem; /* Top padding for fixed header space */
  background-color: #f8fafc;
}

.property-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.property-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.1;
}

.property-price {
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
}

.property-detail__address {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.property-detail__content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
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
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  color: #64748b;
  font-weight: 500;
}

.spec-value {
  font-weight: 700;
  color: #0f172a;
}

.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.description-text {
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.8;
  white-space: pre-line;
}

.not-found {
  text-align: center;
  padding: 4rem;
}
.not-found h2 {
  margin-bottom: 2rem;
  color: #64748b;
}

@media (max-width: 1024px) {
  .property-detail__content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .property-title {
    font-size: 1.75rem;
  }

  .property-price {
    font-size: 1.5rem;
  }
}
</style>
