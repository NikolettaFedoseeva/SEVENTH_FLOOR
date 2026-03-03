<script setup lang="ts">






defineExpose({});
</script>

<template>
  <div class="ui-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-container {
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 640px) {
  .ui-container {
    max-width: 640px;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}

@media (min-width: 768px) {
  .ui-container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .ui-container {
    max-width: 1024px;
    padding-right: 2rem;
    padding-left: 2rem;
  }
}

@media (min-width: 1280px) {
  .ui-container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .ui-container {
    max-width: 1536px;
  }
}
</style>
