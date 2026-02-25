<script setup lang="ts">
import { useSessionStore } from "@/entities/session";
import { useRouter } from "vue-router";
import { Container, Button } from "@/shared/ui";
import { ref } from "vue";

const session = useSessionStore();
const router = useRouter();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const handleLogout = async () => {
  await session.logout();
  router.push("/login");
};
</script>

<template>
  <div class="admin-layout">
    <div
      class="sidebar-backdrop"
      v-if="isSidebarOpen"
      @click="closeSidebar"
    ></div>

    <aside
      class="admin-sidebar"
      :class="{ 'admin-sidebar--open': isSidebarOpen }"
    >
      <div class="admin-sidebar__header">
        <div class="admin-sidebar__logo">Admin Panel</div>
        <button class="close-sidebar-btn" @click="closeSidebar">&times;</button>
      </div>

      <nav class="admin-nav">
        <router-link to="/admin" class="admin-nav__link" @click="closeSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Объявления
        </router-link>
        <!-- <router-link
          to="/admin/properties/create"
          class="admin-nav__link"
          @click="closeSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Добавить объект
        </router-link> -->
        <div class="admin-nav__divider"></div>
        <router-link to="/" class="admin-nav__link" @click="closeSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
            ></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Вернуться на сайт
        </router-link>
      </nav>
      <div class="admin-sidebar__footer">
        <Button
          variant="outline"
          @click="handleLogout"
          block
          class="logout-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="margin-right: 8px"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Выйти
        </Button>
      </div>
    </aside>

    <main class="admin-content">
      <header class="admin-header">
        <button class="hamburger-btn" @click="toggleSidebar">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="admin-header__user">Привет, {{ session.user?.email }}</div>
      </header>
      <div class="admin-page-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.admin-sidebar {
  width: 280px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;

  &__header {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #60a5fa;
  }
}

.close-sidebar-btn {
  display: none;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;

  &__divider {
    height: 1px;
    background-color: #334155;
    margin: 0.5rem 0;
  }

  &__link {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;

    &:hover,
    &.router-link-active {
      background-color: #334155;
      color: white;
    }
  }
}

.admin-content {
  flex: 1;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.admin-header {
  height: 64px;
  min-height: 64px;
  flex-shrink: 0;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2rem;

  &__user {
    font-weight: 600;
    color: #475569;
  }
}

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: #334155;
    border-radius: 2px;
  }
}

.admin-page-container {
  padding: 2rem;
  flex: 1;
}

:deep(.logout-btn) {
  border-color: #475569;
  color: #e2e8f0;

  &:hover {
    background-color: #334155 !important;
    border-color: #64748b !important;
    color: #fff !important;
  }
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

@media (max-width: 768px) {
  .hamburger-btn {
    display: flex;
  }

  .admin-header {
    justify-content: space-between;
    padding: 0 1rem;
  }

  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 50;
    width: 280px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &--open {
      transform: translateX(0);
    }
  }

  .close-sidebar-btn {
    display: block;
  }

  .admin-page-container {
    padding: 1rem;
  }
}
</style>
