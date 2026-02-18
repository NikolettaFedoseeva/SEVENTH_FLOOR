<script setup lang="ts">
import { Container } from "@/shared/ui";

const stats = [
  {
    value: "10+",
    label: "Лет на рынке",
    description: "Безупречной репутации и опыта",
  },
  // {
  //   value: "2500+",
  //   label: "Счастливых семей",
  //   description: "Нашли свой идеальный дом с нашей помощью",
  // },
  // {
  //   value: "45",
  //   label: "Профессионалов",
  //   description: "Агентов, юристов и ипотечных брокеров в штате",
  // },
];
</script>

<template>
  <section class="agency-info">
    <Container>
      <div class="agency-info__grid">
        <div class="agency-info__content">
          <span class="agency-info__subtitle">О компании</span>
          <h2 class="agency-info__title">
            Почему выбирают <span class="text-highlight">Seventh Floor</span>
          </h2>
          <p class="agency-info__text">
            Мы не просто продаем квадратные метры. Наша работа - это экономия
            вашего времени, нервов и ваша страховка от некомпетентных действий
            на рынке недвижимости.
          </p>
          <p class="agency-info__text">
            Поможем определить рыночную стоимость Вашей недвижимости, сдать в
            аренду. Поможем приватизировать Ваше жилье.
          </p>

          <div class="agency-info__stats">
            <div v-for="(stat, index) in stats" :key="index" class="stat-item">
              <div class="stat-item__value">{{ stat.value }}</div>
              <div class="stat-item__label">{{ stat.label }}</div>
              <div class="stat-item__desc">{{ stat.description }}</div>
            </div>
          </div>
        </div>

        <div class="agency-info__image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Interior of Seventh Floor office"
            class="agency-info__image"
          />
          <div class="image-decoration"></div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss" scoped>
.agency-info {
  padding: 8rem 0;
  background-color: #f8fafc;
  overflow: hidden;
}

.agency-info__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.agency-info__content {
  display: flex;
  flex-direction: column;
}

.agency-info__subtitle {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 1rem;
}

.agency-info__title {
  font-size: 3rem;
  line-height: 1.1;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.text-highlight {
  color: #2563eb;
}

.agency-info__text {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #475569;
  margin-bottom: 1.5rem;
}

.agency-info__stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.stat-item {
  flex: 1;
}

.stat-item__value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-item__label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.stat-item__desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.agency-info__image-wrapper {
  position: relative;
  border-radius: 1.5rem;
}

.agency-info__image {
  width: 100%;
  height: auto;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 2;
  transition: transform 0.5s ease;
}

.agency-info__image-wrapper:hover .agency-info__image {
  transform: scale(1.02);
}

.image-decoration {
  position: absolute;
  top: -2rem;
  right: -2rem;
  width: 100%;
  height: 100%;
  border: 4px solid #cbd5e1;
  border-radius: 1.5rem;
  z-index: 1;
}

@media (max-width: 1024px) {
  .agency-info__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .agency-info__image-wrapper {
    order: -1;
    max-width: 600px;
  }

  .image-decoration {
    display: none;
  }
}

@media (max-width: 640px) {
  .agency-info {
    padding: 4rem 0;
  }

  .agency-info__title {
    font-size: 2.25rem;
  }

  .agency-info__stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
