import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/entities/session";

export function useLogin() {
  const username = ref("");
  const password = ref("");
  const isLoading = ref(false);
  const error = ref("");
  const router = useRouter();
  const session = useSessionStore();

  const handleLogin = async () => {
    isLoading.value = true;
    error.value = "";

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username.value === "admin" && password.value === "admin") {
        session.login({ username: username.value, token: "mock-token" });
        router.push("/admin");
      } else {
        error.value = "Неверный логин или пароль";
      }
    } catch (e) {
      error.value = "Ошибка сервера";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    username,
    password,
    isLoading,
    error,
    handleLogin,
  };
}
