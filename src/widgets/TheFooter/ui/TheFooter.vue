<script setup lang="ts">
import { Container } from "@/shared/ui";
</script>

<template>
  <footer class="the-footer">
    <Container>
      <div class="the-footer__content">
        <div class="the-footer__branding">
          <div class="the-footer__logo">СЕДЬМОЙ ЭТАЖ</div>
          <p class="the-footer__desc">
            Агентство недвижимости нового поколения. Мы поможем найти вам дом
            мечты.
          </p>
        </div>

        <div class="the-footer__links">
          <h4 class="the-footer__title">Навигация</h4>
          <router-link to="/catalog">Каталог</router-link>
          <router-link to="/contacts">Контакты</router-link>
        </div>

        <div class="the-footer__contacts">
          <h4 class="the-footer__title">Контакты</h4>
          <a href="tel:+79990000000">+7 (999) 000-00-00</a>
          <a href="mailto:info@7floor.ru">info@7floor.ru</a>
          <p>г. Москва, ул. Примерная, д. 7</p>
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
  padding: 4rem 0 2rem;
  margin-top: auto;
}

.the-footer__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.the-footer__logo {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.the-footer__desc {
  color: #9ca3af;
  line-height: 1.6;
  max-width: 300px;
}

.the-footer__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fff;
}

.the-footer__links,
.the-footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.the-footer__links a,
.the-footer__contacts a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.the-footer__contacts p {
  color: #9ca3af;
}

.the-footer__links a:hover,
.the-footer__contacts a:hover {
  color: #fff;
}

.the-footer__bottom {
  padding-top: 2rem;
  border-top: 1px solid #374151;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .the-footer__content {
    grid-template-columns: 2fr 1fr 1fr;
  }
}
</style>
