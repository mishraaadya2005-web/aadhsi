import { supabase } from "./supabase";

export async function createOrder(orderData) {
  const { error } = await supabase
    .from("orders")
    .insert([orderData]);

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}