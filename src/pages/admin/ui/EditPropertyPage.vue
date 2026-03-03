<script setup lang="ts">
import { useRoute } from "vue-router";
import { CreatePropertyForm } from "@/features/manage-property/create";

// #region refs
const route = useRoute();
const propertyId = route.params.id as string;
// #endregion refs

defineExpose({});
</script>

<template>
  <div class="edit-property-page">
    <h1 class="page-title">Редактирование объявления</h1>
    <CreatePropertyForm :propertyId="propertyId" />
  </div>
</template>

<style lang="scss" scoped>
.edit-property-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
}
</style>
