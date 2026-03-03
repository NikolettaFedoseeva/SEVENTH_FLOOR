```
<script setup lang="ts">
import { onMounted } from "vue";
import { usePropertiesStore } from "@/entities/property/model/store";
import { HeroSection, PropertyCarousel, AgencyInfo } from "@/widgets";
import { useHead } from "@unhead/vue";

// #region refs
const propertiesStore = usePropertiesStore();
// #endregion refs

useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content:
        "Лучшие предложения недвижимости в Тирасполе. Квартиры, дома, участки. Надежное агентство недвижимости 7 Этаж.",
    },
  ],
});

// #region Хуки жизненного цикла
onMounted(() => {
  propertiesStore.fetchProperties();
});
// #endregion Хуки жизненного цикла

defineExpose({});
</script>

<template>
  <div class="home-page">
    <main>
      <HeroSection />
      <PropertyCarousel />
      <AgencyInfo />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
