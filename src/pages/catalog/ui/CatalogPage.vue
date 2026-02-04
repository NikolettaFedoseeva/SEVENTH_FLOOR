<script setup lang="ts">
import { TheHeader, TheFooter, PropertyCatalog } from "@/widgets";
</script>

<template>
  <div class="catalog-page">
    <TheHeader />
    <main>
      <div class="catalog-page__content">
        <PropertyCatalog />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.catalog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.catalog-page__content {
  flex: 1;
}
</style>
