<script setup lang="ts">
import { LoginForm } from "@/features/auth/login";
import { Container } from "@/shared/ui";








defineExpose({});
</script>

<template>
  <div class="login-page">
    <Container>
      <div class="login-page__content">
        <LoginForm />
      </div>
    </Container>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  &__content {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
