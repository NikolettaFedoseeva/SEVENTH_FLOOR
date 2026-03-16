<script setup lang="ts">
import { reactive, ref } from "vue";
import { CustomButton, Input, Card } from "@/shared/ui";
import { apiClient } from "@/shared/api";

// #region defineEmits
const emit = defineEmits<{
  (e: "submit", data: ContactForm): void;
}>();
// #endregion defineEmits

// #region refs
interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const form = reactive<ContactForm>({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const isSubmitting = ref<boolean>(false);
const showSuccess = ref<boolean>(false);
const errorMessage = ref<string>("");
// #endregion refs

// #region Функции
async function handleSubmit(): Promise<void> {
  isSubmitting.value = true;
  errorMessage.value = "";
  showSuccess.value = false;

  try {
    const response = await apiClient.post("/contact", form);
    
    if (response.data.success) {
      showSuccess.value = true;
      emit("submit", { ...form });
      
      // Reset form
      form.name = "";
      form.phone = "";
      form.email = "";
      form.message = "";
      
      // Clear success message after some time
      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    }
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    errorMessage.value = error.response?.data?.error || "Ошибка при отправке. Пожалуйста, попробуйте позже.";
  } finally {
    isSubmitting.value = false;
  }
}
// #endregion Функции
defineExpose({});
</script>

<template>
  <Card class="contact-form">
    <h3 class="contact-form__title">Оставить заявку</h3>
    <p class="contact-form__subtitle">
      Если у вас появились вопросы, напишите нам!
    </p>

    <div v-if="showSuccess" class="contact-form__success">
      Ваша заявка успешно отправлена! Письмо с деталями придет на почту компании.
    </div>

    <div v-if="errorMessage" class="contact-form__error">
      {{ errorMessage }}
    </div>

    <form
      v-if="!showSuccess"
      class="contact-form__fields"
      @submit.prevent="handleSubmit"
    >
      <Input v-model="form.name" label="Имя" placeholder="Ваше имя" required />
      <Input
        v-model="form.phone"
        label="Телефон"
        type="tel"
        mask="+373 (###) ###-##"
        placeholder="+373 (___) ___-__"
        required
      />
      <Input
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="your@email.com"
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
.contact-form {
  &__title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
  &__subtitle {
    margin: 0 0 1.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__actions {
    margin-top: 0.5rem;
  }
  &__success {
    padding: 1rem;
    background-color: #f0fdf4;
    border: 1px solid #bbfcce;
    border-radius: 0.5rem;
    color: #15803d;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
  &__error {
    padding: 0.75rem;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    color: #b91c1c;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
}
</style>
