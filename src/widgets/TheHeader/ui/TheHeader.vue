<script setup lang="ts">
import { Container } from "@/shared/ui";
</script>

<template>
  <header class="the-header">
    <Container class="the-header__container-wrapper">
      <div class="the-header__content">
        <!-- Branding Section -->

        <router-link to="/" class="the-header__brand">
          <div class="the-header__logo-circle">
            <span>LOGO</span>
          </div>
          <div class="the-header__brand-text">
            <h1 class="the-header__title">СЕДЬМОЙ ЭТАЖ</h1>
            <p class="the-header__subtitle">АГЕНТСТВО НЕДВИЖИМОСТИ</p>
          </div>
        </router-link>

        <!-- Navigation Section -->
        <nav class="the-header__nav">
          <router-link to="/" class="the-header__link">Главная</router-link>
          <router-link to="/contacts" class="the-header__link"
            >О нас</router-link
          >
          <router-link to="/catalog" class="the-header__link"
            >Каталог</router-link
          >
        </nav>
      </div>
    </Container>
  </header>
</template>

<style scoped lang="scss">
.the-header {
  height: auto;
  min-height: 100px;
  background-color: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
  color: white;
  transition: all 0.3s ease;

  &__container-wrapper {
    position: relative;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 102;
  }

  // Brand Styles
  &__brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;

    @media (max-width: 768px) {
      width: auto;
    }
  }

  &__logo-circle {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0f172a;
    font-weight: bold;
    font-size: 0.8rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &__brand-text {
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
    text-transform: uppercase;
    color: #fff;
    letter-spacing: 0.05em;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  &__subtitle {
    font-size: 0.7rem;
    margin: 0;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #cbd5e1;

    @media (max-width: 768px) {
      font-size: 0.6rem;
    }
  }

  // Nav Styles
  &__nav {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      gap: 1rem;
    }
  }

  &__link {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    transition: color 0.2s;

    &:hover,
    &.router-link-active {
      color: #fff;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
}
</style>
