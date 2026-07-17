import { supabase } from "./supabase";

export async function saveCustomBouquet(data) {
  const { error } = await supabase
    .from("custom_bouquets")
    .insert([data]);

  if (error) {
    console.log(error);
  }

  return !error;
}

