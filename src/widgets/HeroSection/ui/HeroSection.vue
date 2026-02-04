<script setup lang="ts">
import { onMounted } from "vue";
import { Container, CustomButton } from "@/shared/ui";

onMounted(() => {
  // Animation logic if needed
});
</script>

<template>
  <section class="hero-section">
    <div class="hero-section__bg"></div>
    <div class="hero-section__overlay"></div>

    <Container class="hero-section__container">
      <div class="hero-section__main">
        <!-- Main Content -->
        <div class="hero-section__content">
          <h1 class="hero-section__title">
            АГЕНТ ПО <br />
            <span class="hero-section__highlight">НЕДВИЖИМОСТИ</span>
          </h1>

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
            Наши эксперты готовы предложить вам лучшие варианты жилья, помочь с
            продажей или арендой недвижимости, и поделиться ценными советами по
            инвестициям.
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
            Проектирование, установка и техническое обслуживание систем
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
            Проектирование, установка и техническое обслуживание систем
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
            Проектирование, установка и техническое обслуживание систем
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
            Проектирование, установка и техническое обслуживание систем
          </p>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
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

.hero-section__title {
  font-size: 5rem;
  font-weight: 800;
  line-height: 0.9;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
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

@media (max-width: 576px) {
  .hero-section__title {
    font-size: 2.5rem;
  }

  .hero-section__benefits {
    grid-template-columns: 1fr;
  }

  .benefit-card {
    align-items: flex-start;
    text-align: left;
    flex-direction: row;
  }

  .benefit-card__icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    margin-bottom: 0;
  }

  .benefit-card__icon .icon {
    width: 24px;
    height: 24px;
  }
}
</style>
