import { supabase } from "./supabase";

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  return { error };
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}