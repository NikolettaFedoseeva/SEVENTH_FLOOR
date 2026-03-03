<script setup lang="ts">
import { TheHeader, TheFooter } from "@/widgets";








defineExpose({});
</script>

<template>
  <div class="main-layout">
    <TheHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1; /* Pushes footer to the bottom */
}
</style>
