import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/entities/session";

export function useLogin() {
  const email = ref("");
  const password = ref("");
  const isLoading = ref(false);
  const error = ref("");
  const router = useRouter();
  const session = useSessionStore();

  const handleLogin = async () => {
    isLoading.value = true;
    error.value = "";

    try {
      if (!email.value || !password.value) {
        error.value = "Введите email и пароль";
        return;
      }
      
      await session.login({ email: email.value, password: password.value });
      router.push("/admin");
    } catch (e: any) {
      console.error(e);
      error.value = e.message || "Ошибка входа";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    email,
    password,
    isLoading,
    error,
    handleLogin,
  };
}
