<script setup lang="ts">
import { CreatePropertyForm } from "@/features/manage-property/create";








defineExpose({});
</script>

<template>
  <div class="create-property-page">
    <CreatePropertyForm />
  </div>
</template>

<style lang="scss" scoped>
.create-property-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
