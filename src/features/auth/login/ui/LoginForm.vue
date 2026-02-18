<script setup lang="ts">
import { useLogin } from "../model/useLogin";
import { Button, Input, Card } from "@/shared/ui";

const { username, password, isLoading, error, handleLogin } = useLogin();
</script>

<template>
  <Card class="login-form">
    <h2 class="login-form__title">Вход в систему</h2>

    <form @submit.prevent="handleLogin" class="login-form__fields">
      <div class="field">
        <label>Логин</label>
        <Input v-model="username" placeholder="admin" />
      </div>

      <div class="field">
        <label>Пароль</label>
        <Input v-model="password" type="password" placeholder="admin" />
      </div>

      <div v-if="error" class="login-form__error">
        {{ error }}
      </div>

      <Button type="submit" variant="primary" :disabled="isLoading" block>
        {{ isLoading ? "Вход..." : "Войти" }}
      </Button>
    </form>
  </Card>
</template>

<style lang="scss" scoped>
.login-form {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
}

.login-form__title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.login-form__fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.login-form__error {
  padding: 0.75rem;
  background-color: #fef2f2;
  color: #ef4444;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
}
</style>
