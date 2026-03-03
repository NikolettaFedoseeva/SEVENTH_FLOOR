<script setup lang="ts">
import { Card, CustomButton } from "@/shared/ui";
import { type PropType } from "vue";
import type { Agent } from "../../model/types";

// #region defineProps
const props = defineProps({
  agent: {
    type: Object as PropType<Agent>,
    required: true,
  },
});
// #endregion defineProps

defineExpose({});
</script>

<template>
  <Card class="agent-card">
    <div class="agent-card__header">
      <img
        :src="agent.avatarUrl"
        :alt="agent.name"
        class="agent-card__avatar"
      />
      <div class="agent-card__info">
        <h3 class="agent-card__name">{{ agent.name }}</h3>
        <p class="agent-card__role">{{ agent.role }}</p>
      </div>
    </div>
    <div class="agent-card__actions">
      <CustomButton variant="primary" block :href="`tel:${agent.phone}`">
        Позвонить
      </CustomButton>
      <CustomButton variant="secondary" block :href="`mailto:${agent.email}`">
        Написать
      </CustomButton>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.agent-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--bg-secondary);
  transition: background-color 0.3s ease;
  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }
  &__info {
    flex: 1;
  }
  &__name {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  &__role {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
