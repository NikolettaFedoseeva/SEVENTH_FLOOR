<script setup lang="ts">
import {
  TheHeader,
  TheFooter,
  HeroSection,
  PropertyCarousel,
  AgencyInfo,
} from "@/widgets";
</script>

<template>
  <div class="home-page">
    <TheHeader />
    <main>
      <HeroSection />
      <PropertyCarousel />
      <AgencyInfo />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
