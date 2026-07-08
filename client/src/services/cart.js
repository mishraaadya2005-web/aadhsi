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

export async function removeCartItem(cartItemId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) console.log(error);

  return !error;
}

export async function updateCartQuantity(cartItemId, quantity) {
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);

  if (error) console.log(error);

  return !error;
}

export async function clearCart(userId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) console.log(error);

  return !error;
}