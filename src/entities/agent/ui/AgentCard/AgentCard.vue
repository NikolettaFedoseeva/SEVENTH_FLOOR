<script setup lang="ts">
import { Card, CustomButton } from "@/shared/ui";
import type { Agent } from "../../model/types";

interface Props {
  agent: Agent;
}

defineProps<Props>();
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

<style scoped>
.agent-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--bg-secondary);
  transition: background-color 0.3s ease;
}

.agent-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.agent-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.agent-card__info {
  flex: 1;
}

.agent-card__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.agent-card__role {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.agent-card__actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
