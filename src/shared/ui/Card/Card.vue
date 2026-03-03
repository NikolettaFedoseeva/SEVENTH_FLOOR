<script setup lang="ts">
// #region defineProps
const props = defineProps({
  padding: {
    type: Boolean,
    default: true,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
});
// #endregion defineProps

defineExpose({});
</script>

<template>
  <div
    class="ui-card"
    :class="{
      'ui-card--padding': padding,
      'ui-card--hoverable': hoverable,
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &--padding {
    padding: 1rem;
  }

  &--hoverable:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-color: #d1d5db;
  }
}
</style>
