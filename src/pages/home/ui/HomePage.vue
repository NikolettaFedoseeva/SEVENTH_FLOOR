```
<script setup lang="ts">
import { onMounted } from "vue";
import { usePropertiesStore } from "@/entities/property/model/store";
import {
  TheHeader,
  TheFooter,
  HeroSection,
  PropertyCarousel,
  AgencyInfo,
} from "@/widgets";
import { useHead } from "@unhead/vue";

useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content: "Лучшие предложения недвижимости в Тирасполе. Квартиры, дома, участки. Надежное агентство недвижимости 7 Этаж."
    }
  ]
});

const propertiesStore = usePropertiesStore();

onMounted(() => {
  propertiesStore.fetchProperties();
});
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

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
