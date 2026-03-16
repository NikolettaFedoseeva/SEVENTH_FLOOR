import { defineStore } from "pinia";
import { ref } from "vue";
import { apiClient } from "@/shared/api";

export const useSessionStore = defineStore("session", () => {
  const isAuth = ref(false);
  const user = ref<any | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));

  const checkAuth = async () => {
    if (!token.value) return;
    
    try {
      const response = await apiClient.get('/auth/me');
      if (response.data.user) {
        isAuth.value = true;
        user.value = response.data.user;
      }
    } catch (err) {
      isAuth.value = false;
      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');
    }
  };

  const login = async (payload: { email: string; password: string }) => {
    try {
      const response = await apiClient.post('/auth/login', payload);
      if (response.data.session?.access_token) {
        isAuth.value = true;
        user.value = response.data.user;
        token.value = response.data.session.access_token;
        localStorage.setItem('auth_token', token.value!);
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Ошибка авторизации");
    }
  };

  const logout = async () => {
    isAuth.value = false;
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
  };

  return { isAuth, user, token, login, logout, checkAuth };
});
