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