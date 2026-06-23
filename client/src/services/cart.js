import { supabase } from "./supabase";

export async function addToCart(data) {
  const { error } = await supabase
    .from("cart_items")
    .insert([data]);

  if (error) {
    console.log(error);
  }

  return !error;
}

export async function getCartItems(userId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}