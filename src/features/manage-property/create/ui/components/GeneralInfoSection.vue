<script setup lang="ts">
import { type PropType } from "vue";
import { Card, Input } from "@/shared/ui";
import { currencies } from "../../model/options";

// #region defineProps
const props = defineProps({
  form: {
    type: Object as PropType<any>,
    required: true,
  },
  errors: {
    type: Object as PropType<any>,
    required: true,
  },
});
// #endregion defineProps

// #region Функции
const preventInvalidNumberChars = (e: KeyboardEvent): void => {
  // Allow control keys (Backspace, Tab, Delete, Arrows, etc)
  if (e.key.length > 1 || e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }
  // Prevent anything that is not a digit
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};
// #endregion Функции

defineExpose({});
</script>

<template>
  <Card class="form-section">
    <div class="form-grid">
      <div class="field full">
        <label>Заголовок объявления <span class="required">*</span></label>
        <Input v-model="form.title" placeholder="" maxlength="70" />
        <div class="char-count">{{ form.title.length }}/70</div>
        <span v-if="errors.title" class="error-text">{{ errors.title }}</span>
      </div>

      <div class="field full">
        <label>Текст объявления <span class="required">*</span></label>
        <textarea
          v-model="form.description"
          class="description-input"
          rows="6"
          placeholder=""
          maxlength="150"
        ></textarea>
        <div class="char-count">{{ form.description.length }}/150</div>
        <span v-if="errors.description" class="error-text">{{ errors.description }}</span>
      </div>

      <div class="field-group price-group">
        <div class="field">
          <label>Цена <span class="required">*</span></label>
          <div class="price-input-wrapper">
            <Input
              v-model="form.price"
              type="text"
              placeholder=""
              @keydown="preventInvalidNumberChars"
            />
            <div class="currency-toggles">
              <button
                type="button"
                v-for="curr in currencies"
                :key="curr.value"
                :class="['curr-btn', { active: form.currency === curr.value }]"
                @click="form.currency = curr.value as 'mdl' | 'usd' | 'eur'"
              >
                {{ curr.label }}
              </button>
            </div>
          </div>
          <span v-if="errors.price" class="error-text">{{ errors.price }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.description-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

.char-count {
  text-align: right;
  font-size: 0.75rem;
  color: #10b981;
  font-weight: 600;
  margin-top: 0.25rem;
}

.price-group {
  grid-column: 1 / -1;
}

.price-input-wrapper {
  display: flex;
  gap: 1rem;
  max-width: 365px;
}

.currency-toggles {
  display: flex;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  overflow: hidden;
  width: 180px;

  .curr-btn {
    flex: 1;
    padding: 0.35rem 0.5rem;
    background: white;
    border: none;
    border-right: 1px solid #3b82f6;
    cursor: pointer;
    font-weight: 500;
    color: #374151;
    font-size: 0.75rem;

    &:last-child {
      border-right: none;
    }

    &.active {
      background: #3b82f6;
      color: white;
    }
  }
}
</style>
