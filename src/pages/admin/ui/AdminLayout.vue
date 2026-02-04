<script setup lang="ts">
import { useSessionStore } from "@/entities/session";
import { useRouter } from "vue-router";
import { Container, Button } from "@/shared/ui";

const session = useSessionStore();
const router = useRouter();

const handleLogout = () => {
  session.logout();
  router.push("/login");
};
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__logo">Admin Panel</div>
      <nav class="admin-nav">
        <router-link to="/admin" class="admin-nav__link">Дашборд</router-link>
        <router-link to="/admin/properties/create" class="admin-nav__link"
          >Добавить объект</router-link
        >
        <div class="admin-nav__divider"></div>
        <router-link to="/" class="admin-nav__link"
          >Вернуться на сайт</router-link
        >
      </nav>
      <div class="admin-sidebar__footer">
        <Button variant="outline" @click="handleLogout" block class="logout-btn"
          >Выйти</Button
        >
      </div>
    </aside>

    <main class="admin-content">
      <header class="admin-header">
        <div class="admin-header__user">
          Привет, {{ session.user?.username }}
        </div>
      </header>
      <div class="admin-page-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 280px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.admin-sidebar__logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #60a5fa;
}

.admin-nav__divider {
  height: 1px;
  background-color: #334155;
  margin: 0.5rem 0;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.admin-nav__link {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s;
}

.admin-nav__link:hover,
.admin-nav__link.router-link-active {
  background-color: #334155;
  color: white;
}

.admin-content {
  flex: 1;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
}

.admin-header {
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2rem;
}

.admin-header__user {
  font-weight: 600;
  color: #475569;
}

.admin-page-container {
  padding: 2rem;
  flex: 1;
}

/* Fix visibility on dark sidebar */
:deep(.logout-btn) {
  border-color: #475569;
  color: #e2e8f0;
}

:deep(.logout-btn:hover) {
  background-color: #334155 !important;
  border-color: #64748b !important;
  color: #fff !important;
}
</style>
