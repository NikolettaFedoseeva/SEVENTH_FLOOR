import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSessionStore = defineStore("session", () => {
  const isAuth = ref(false);
  const user = ref<{ username: string } | null>(null);

  const checkAuth = () => {
    // Mock persistent auth check (could check localStorage here)
    const stored = localStorage.getItem("isAuth");
    if (stored === "true") {
      isAuth.value = true;
      user.value = { username: "admin" };
    }
  };

  const login = (payload: { username: string; token: string }) => {
    isAuth.value = true;
    user.value = { username: payload.username };
    localStorage.setItem("isAuth", "true");
  };

  const logout = () => {
    isAuth.value = false;
    user.value = null;
    localStorage.removeItem("isAuth");
  };

  return { isAuth, user, login, logout, checkAuth };
});
