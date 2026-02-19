import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/shared/api/supabase";
import { Session, User } from "@supabase/supabase-js";

export const useSessionStore = defineStore("session", () => {
  const isAuth = ref(false);
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      isAuth.value = true;
      user.value = data.session.user;
      session.value = data.session;
    }
  };

  const login = async (payload: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) throw error;
    if (data.session) {
      isAuth.value = true;
      user.value = data.user;
      session.value = data.session;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    isAuth.value = false;
    user.value = null;
    session.value = null;
  };

  return { isAuth, user, session, login, logout, checkAuth };
});
