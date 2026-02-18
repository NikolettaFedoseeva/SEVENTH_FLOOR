<script setup lang="ts">
import { Container } from "@/shared/ui";
</script>

<template>
  <footer class="the-footer">
    <Container>
      <div class="the-footer__content">
        <div class="the-footer__branding">
          <router-link to="/" class="the-footer__logo"
            >СЕДЬМОЙ ЭТАЖ</router-link
          >
          <p class="the-footer__desc">
            Агентство недвижимости нового поколения. Мы поможем найти вам дом
            мечты.
          </p>
        </div>

        <div class="the-footer__links">
          <h4 class="the-footer__title">Навигация</h4>
          <router-link to="/catalog">Каталог</router-link>
          <router-link to="/contacts">О нас</router-link>
        </div>

        <div class="the-footer__contacts">
          <h4 class="the-footer__title">Контакты</h4>
          <a href="tel:+37377794040">0(777) 94040</a>
          <!-- <a href="mailto:info@7floor.ru">info@7floor.ru</a> -->
          <!-- <p>г. Тирасполь, ул. Текстильщиков, 38 (Балка)</p> -->
        </div>
      </div>

      <div class="the-footer__bottom">
        <p>
          &copy; {{ new Date().getFullYear() }} Седьмой этаж. Все права
          защищены.
        </p>
      </div>
    </Container>
  </footer>
</template>

<style scoped>
.the-footer {
  background-color: #1f2937;
  color: #fff;
  padding: 2rem 0 1rem;
  margin-top: auto;
}

.the-footer__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.the-footer__logo {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: #fff;
  display: inline-block;
  cursor: pointer;
}

.the-footer__desc {
  color: #9ca3af;
  line-height: 1.4;
  max-width: 300px;
  font-size: 0.9rem;
}

.the-footer__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

.the-footer__links,
.the-footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.the-footer__links a,
.the-footer__contacts a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.9rem;
}

.the-footer__contacts p {
  color: #9ca3af;
}

.the-footer__links a:hover,
.the-footer__contacts a:hover {
  color: #fff;
}

.the-footer__bottom {
  padding-top: 1rem;
  border-top: 1px solid #374151;
  text-align: center;
  color: #6b7280;
  font-size: 0.8rem;
}

@media (min-width: 768px) {
  .the-footer__content {
    grid-template-columns: 2fr 1fr 1fr;
  }
}
</style>
