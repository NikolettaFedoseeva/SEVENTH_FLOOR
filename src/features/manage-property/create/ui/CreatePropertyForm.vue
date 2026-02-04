<script setup lang="ts">
import { useCreateProperty } from "../model/useCreateProperty";
import { Button, Input, Card } from "@/shared/ui";

const { form, errors, isLoading, success, createProperty } =
  useCreateProperty();
</script>

<template>
  <Card class="create-property">
    <h2 class="form-title">Добавить объект</h2>

    <div v-if="success" class="success-message">Объект успешно добавлен!</div>

    <form @submit.prevent="createProperty" class="property-form">
      <div class="form-grid">
        <div class="field">
          <label>Название объявления</label>
          <Input
            v-model="form.title"
            placeholder="Просторная двушка в центре"
          />
          <span v-if="errors.title" class="error">{{ errors.title }}</span>
        </div>

        <div class="field">
          <label>Адрес</label>
          <Input v-model="form.address" placeholder="ул. Ленина, 1" />
          <span v-if="errors.address" class="error">{{ errors.address }}</span>
        </div>

        <div class="field">
          <label>Цена (₽)</label>
          <Input v-model="form.price" type="number" placeholder="10000000" />
          <span v-if="errors.price" class="error">{{ errors.price }}</span>
        </div>

        <div class="field">
          <label>Ссылка на фото</label>
          <Input v-model="form.imageUrl" placeholder="https://..." />
        </div>

        <div class="field small">
          <label>Площадь (м²)</label>
          <Input v-model="form.area" type="number" placeholder="50" />
        </div>

        <div class="field small">
          <label>Комнат</label>
          <Input v-model="form.rooms" type="number" placeholder="2" />
        </div>
      </div>

      <div class="field full">
        <label>Описание</label>
        <textarea
          v-model="form.description"
          class="description-input"
          placeholder="Детальное описание..."
          rows="5"
        ></textarea>
      </div>

      <div class="form-actions">
        <Button type="submit" variant="primary" :disabled="isLoading">
          {{ isLoading ? "Сохранение..." : "Добавить объект" }}
        </Button>
      </div>
    </form>
  </Card>
</template>

<style scoped>
.form-title {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.success-message {
  background-color: #f0fdf4;
  color: #166534;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.property-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.error {
  font-size: 0.75rem;
  color: #ef4444;
}

.description-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-family: inherit;
  resize: vertical;
}

.description-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
