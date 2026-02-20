<script setup lang="ts">
import { reactive, ref } from "vue";
import { CustomButton, Input, Card } from "@/shared/ui";

interface ContactForm {
  name: string;
  phone: string;
  message: string;
}

const emit = defineEmits<{
  (e: "submit", data: ContactForm): void;
}>();

const form = reactive<ContactForm>({
  name: "",
  phone: "",
  message: "",
});

const isSubmitting = ref(false);

async function handleSubmit() {
  isSubmitting.value = true;
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  emit("submit", { ...form });
  isSubmitting.value = false;
  // Reset form
  form.name = "";
  form.phone = "";
  form.message = "";
}
</script>

<template>
  <Card class="contact-form">
    <h3 class="contact-form__title">Оставить заявку</h3>
    <p class="contact-form__subtitle">Если у вас появились вопросы, напишите нам!</p>

    <form class="contact-form__fields" @submit.prevent="handleSubmit">
      <Input v-model="form.name" label="Имя" placeholder="Ваше имя" required />
      <Input
        v-model="form.phone"
        label="Телефон"
        type="tel"
        placeholder="+7 (___) ___-__-__"
        required
      />
      <Input
        v-model="form.message"
        label="Сообщение"
        type="textarea"
        placeholder="Ваше сообщение"
        required
      />
      <div class="contact-form__actions">
        <CustomButton
          type="submit"
          variant="primary"
          block
          :disabled="isSubmitting"
          text=""
        >
          {{ isSubmitting ? "Отправка..." : "Отправить заявку" }}
        </CustomButton>
      </div>
    </form>
  </Card>
</template>

<style lang="scss" scoped>
.contact-form__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.contact-form__subtitle {
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.contact-form__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form__actions {
  margin-top: 0.5rem;
}
</style>
