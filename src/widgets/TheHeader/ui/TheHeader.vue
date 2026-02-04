<script setup lang="ts">
import { Container } from "@/shared/ui";
</script>

<template>
  <header class="the-header">
    <Container>
      <div class="the-header__content">
        <!-- Branding Section -->
        <div class="the-header__brand">
          <div class="the-header__logo-circle">
            <span>LOGO</span>
          </div>
          <div class="the-header__brand-text">
            <h1 class="the-header__title">СЕДЬМОЙ ЭТАЖ</h1>
            <p class="the-header__subtitle">АГЕНТСТВО НЕДВИЖИМОСТИ</p>
          </div>
        </div>

        <!-- Navigation Section -->
        <nav class="the-header__nav">
          <router-link to="/" class="the-header__link">Главная</router-link>
          <router-link to="/about" class="the-header__link">О нас</router-link>
          <router-link to="/services" class="the-header__link"
            >Услуги</router-link
          >
        </nav>

        <!-- Contact Section -->
        <div class="the-header__contacts">
          <div class="the-header__phone-block">
            <a href="tel:+37377794040" class="the-header__phone-main"
              >77794040</a
            >
            <!-- <div class="the-header__sub-phones">
              <a href="tel:+70000000000">+7 000 000 00 00</a>
              <a href="tel:+70000000000">+7 000 000 00 00</a>
            </div> -->
          </div>
          <div class="the-header__address">
            <p>Россия, 125040, г. Москва, Ленинский проспект</p>
            <p>просто пустое место пока что</p>
          </div>
        </div>
      </div>
    </Container>
  </header>
</template>

<style scoped>
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
}

.the-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

/* Brand Styles */
.the-header__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.the-header__logo-circle {
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

.the-header__brand-text {
  display: flex;
  flex-direction: column;
}

.the-header__title {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.05em;
}

.the-header__subtitle {
  font-size: 0.7rem;
  margin: 0;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #cbd5e1;
}

/* Nav Styles */
.the-header__nav {
  display: flex;
  gap: 2rem;
}

.the-header__link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  transition: color 0.2s;
}

.the-header__link:hover,
.the-header__link.router-link-active {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Contact Styles */
.the-header__contacts {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 0.85rem;
}

.the-header__phone-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.the-header__phone-main {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24; /* Amber-400 */
  text-decoration: none;
  line-height: 1;
  margin-bottom: 0.25rem;
  transition: 0.2s;
}

.the-header__phone-main:hover {
  color: #fcd34d;
}

.the-header__sub-phones {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-end;
}

.the-header__sub-phones a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
}

.the-header__address {
  max-width: 200px;
  opacity: 0.8;
  font-size: 0.75rem;
  line-height: 1.4;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 1rem;
}

@media (max-width: 992px) {
  .the-header__nav {
    display: none;
  }

  .the-header__address {
    display: none;
  }
}

@media (max-width: 768px) {
  .the-header__content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .the-header__contacts {
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
  }

  .the-header__phone-block {
    align-items: flex-start;
  }

  .the-header__sub-phones {
    align-items: flex-start;
  }
}
</style>
