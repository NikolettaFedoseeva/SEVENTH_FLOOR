<script setup lang="ts">
import { Card } from "@/shared/ui";
</script>

<template>
  <div class="dashboard-page">
    <h1 class="page-title">Дашборд</h1>

    <div class="dashboard-grid">
      <Card class="dashboard-stat">
        <div class="stat-value">124</div>
        <div class="stat-label">Всего объектов</div>
      </Card>
      <Card class="dashboard-stat">
        <div class="stat-value">15</div>
        <div class="stat-label">Новых за месяц</div>
      </Card>
      <Card class="dashboard-stat">
        <div class="stat-value">4.8</div>
        <div class="stat-label">Рейтинг агенства</div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.dashboard-stat {
  padding: 2rem;
  text-align: center;
}

.stat-value {
  font-size: 3rem;
  font-weight: 800;
  color: #2563eb;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-weight: 500;
}
</style>
