<script setup lang="ts">
import { useHead } from "@unhead/vue";

useHead({
  titleTemplate: "%s | 7 Этаж",
  meta: [
    {
      name: "description",
      content: "Агентство недвижимости 7 Этаж в Тирасполе и ПМР. Продажа и аренда квартир, домов, коммерческой недвижимости."
    }
  ]
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "./app/styles/index.css";

#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
