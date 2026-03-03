<script setup lang="ts">
import { onMounted } from "vue";
import { Container, CustomButton } from "@/shared/ui";

// #region Хуки жизненного цикла
onMounted(() => {
  // Animation logic if needed
});
// #endregion Хуки жизненного цикла

defineExpose({});
</script>

<template>
  <section class="hero-section">
    <div class="hero-section__bg"></div>
    <div class="hero-section__overlay"></div>

    <Container class="hero-section__container">
      <div class="hero-section__main">
        <!-- Main Content -->
        <div class="hero-section__content">
          <!-- Mobile Contact Info (Visible only on mobile) -->
          <!-- <div class="hero-section__mobile-contacts">
            <div class="mobile-contact-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="icon-sm"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>г. Тирасполь, ул. Текстильщиков, 38 (Балка)</span>
            </div>
            <div class="mobile-contact-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="icon-sm"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                ></path>
              </svg>
              <div class="mobile-phones">
                <a href="tel:+37377794040">0(777) 94040</a>
              </div>
            </div>
          </div> -->

          <h1 class="hero-section__title">
            АГЕНТ ПО <br />
            <span class="hero-section__highlight">НЕДВИЖИМОСТИ</span>
          </h1>

          <div class="hero-section__subtitle-phone">
            <a href="tel:+37377794040">0(777) 94040</a>
          </div>

          <div class="hero-section__divider">
            <div class="hero-section__divider-line"></div>
            <div class="hero-section__divider-icons">
              <!-- Decorative icons similar to image -->
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span class="hero-section__divider-text"
                >Полная безопасность и гарантия...</span
              >
            </div>
            <div class="hero-section__divider-line"></div>
          </div>

          <p class="hero-section__description">
            Агентство недвижимости поможет Вам продать, купить, подарить,
            завещать, переоформить грамотно, конфиденциально и быстро вашу
            недвижимость; узаконить перепланировку.
          </p>

          <div class="hero-section__actions">
            <CustomButton variant="primary" size="lg" to="/contacts">
              Связаться
            </CustomButton>
          </div>
        </div>
      </div>

      <!-- Bottom Benefits Block -->
      <div class="hero-section__benefits">
        <div class="benefit-card">
          <div class="benefit-card__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="icon"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3 class="benefit-card__title">ПОЛНЫЙ СПЕКТР УСЛУГ</h3>
          <p class="benefit-card__text">
            Поможем продать, купить, подарить, завещать, переоформить вашу
            недвижимость
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-card__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="icon"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="benefit-card__title">ЭКСПЕРТНОЕ ЗНАНИЕ РЫНКА</h3>
          <p class="benefit-card__text">
            Поможем узаконить перепланировку, получить разрешение на
            строительство
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-card__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="icon"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3 class="benefit-card__title">ВРЕМЯ И УДОБСТВО</h3>
          <p class="benefit-card__text">
            Наша работа - это экономия вашего времени и ваша страховка
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-card__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="icon"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 class="benefit-card__title">ИНДИВИДУАЛЬНЫЙ ПОДХОД</h3>
          <p class="benefit-card__text">
            Выедем к вам по месту и решим все вопросы, поможем определить
            стоимость
          </p>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100vh; /* Full screen height to match image immersive feel */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding-top: 80px; /* Offset for sticky header */
  overflow: hidden;
}

.hero-section__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop");
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.hero-section__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0.4) 0%,
    rgba(15, 23, 42, 0.8) 100%
  );
  z-index: -1;
}

.hero-section__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 2rem;
  padding-top: 4rem;
  width: 100%;
}

.hero-section__main {
  flex: 1;
  display: flex;
  align-items: center;
}

.hero-section__content {
  max-width: 800px;
}

/* Mobile Contacts */
.hero-section__mobile-contacts {
  display: none; /* Hidden by default */
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 0.8rem;
}

@media (max-width: 1280px) {
  .hero-section__mobile-contacts {
    display: flex;
  }
}

.mobile-contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
}

.mobile-phones {
  display: flex;
  flex-direction: column;
  text-align: center; /* Center align phones */
  align-items: center;
}

.mobile-phones a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
}

.hero-section__title {
  font-size: 5rem;
  font-weight: 800;
  line-height: 0.9;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.hero-section__subtitle-phone {
  margin-bottom: 2rem;
}

.hero-section__subtitle-phone a {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fbbf24;
  text-decoration: none;
  transition: color 0.2s;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-section__subtitle-phone a:hover {
  color: #fcd34d;
}

.hero-section__highlight {
  color: white;
  display: block;
}

.hero-section__divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  color: #fbbf24;
}

.hero-section__divider-line {
  height: 2px;
  width: 50px;
  background-color: currentColor;
}

.hero-section__divider-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.hero-section__divider-text {
  font-size: 0.9rem;
  opacity: 0.9;
}

.hero-section__description {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 600px;
  margin-bottom: 3rem;
}

/* Benefits (Footer of Hero) */
.hero-section__benefits {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 2rem;
}

.benefit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.benefit-card__icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.benefit-card__icon .icon {
  width: 40px;
  height: 40px;
  stroke: white;
}

.benefit-card__title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.05em;
  color: white;
}

.benefit-card__text {
  font-size: 0.75rem;
  opacity: 0.6;
  margin: 0;
  line-height: 1.4;
  max-width: 200px;
}

@media (max-width: 992px) {
  .hero-section__title {
    font-size: 3.5rem;
  }

  .hero-section__benefits {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 0;
    align-items: center; /* Fix alignment - center vertically */
  }

  .hero-section__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center !important; /* Force center alignment */
    margin-top: 2rem; /* Give space from header */
    width: 100%; /* Ensure full width for centering */
  }

  /* Show mobile contacts */
  .hero-section__mobile-contacts {
    display: flex;
  }

  .hero-section__title {
    font-size: 2rem; /* Fix font size */
    margin-bottom: 1.5rem;
  }

  .hero-section__subtitle-phone a {
    font-size: 1.8rem;
  }

  .hero-section__divider {
    display: none; /* Simplify on mobile if too crowded, or keep */
  }

  .hero-section__description {
    display: none; /* Image layout implies focusing on Title + Icons */
  }

  .hero-section__actions {
    display: none; /* Hide buttons if following strict image layout */
  }

  /* Benefits Stack */
  .hero-section__benefits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    border-top: none;
    margin-top: 2rem;
  }

  .benefit-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
