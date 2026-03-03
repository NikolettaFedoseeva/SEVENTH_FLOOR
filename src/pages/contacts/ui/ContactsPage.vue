<script setup lang="ts">
import { ContactForm } from "@/features/contact-agent";
import { Container } from "@/shared/ui";








defineExpose({});
</script>

<template>
  <div class="contacts-page">
    <main>
      <Container>
        <div class="contacts-page__content">
          <div class="contacts-page__info">
            <h1 class="contacts-page__title">О нас</h1>
            <p class="contacts-page__description">
              Агентство недвижимости поможет вам грамотно, конфиденциально и в
              кратчайшие сроки продать, купить, подарить, завещать или
              переоформить недвижимость. Мы оказываем содействие в узаконивании
              перепланировок, определении рыночной стоимости объекта, сдаче в
              аренду и приватизации жилья.
              <br />
              <br />
              Наша работа - это экономия вашего времени и ваша страховка от
              некомпетентных действий на рынке недвижимости. Мы на этом рынке
              уже более 10-ти лет.
            </p>

            <div class="contacts-list">
              <!-- <div class="contacts-list__item">
                <h3>Адрес</h3>
                <p>г. Тирасполь, ул. Текстильщиков, 38 (Балка)</p>
              </div> -->
              <div class="contacts-list__item">
                <h3>Телефон</h3>
                <p><a href="tel:+37377794040">0(777) 94040</a></p>
              </div>
              <!-- <div class="contacts-list__item">
                <h3>Email</h3>
                <p><a href="mailto:info@7floor.ru">info@7floor.ru</a></p>
              </div> -->
              <div class="contacts-list__item">
                <h3>Режим работы</h3>
                <p>Пн-Пт: 10:00 - 18:00<br />Сб-Вс: Выходной</p>
              </div>
            </div>
          </div>

          <div class="contacts-page__form">
            <ContactForm />
          </div>
        </div>

        <!-- <div class="contacts-page__map">
          <iframe
            src="https://maps.google.com/maps?q=Tiraspol%2C%20Tekstilshchikov%2C%2038&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> -->
      </Container>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.contacts-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contacts-page__content {
  padding: 4rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.contacts-page__map {
  margin-bottom: 4rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.contacts-page__title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem;
}

.contacts-page__description {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contacts-list {
  display: grid;
  gap: 1.5rem;
}

.contacts-list__item h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem;
}

.contacts-list__item p,
.contacts-list__item a {
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
  text-decoration: none;
  line-height: 1.5;
}

.contacts-list__item a:hover {
  color: #2563eb;
}

@media (min-width: 768px) {
  .contacts-page__content {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
