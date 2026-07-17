import { supabase } from './supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.log(error)
    return []
  }

  return data
}

export async function getSingleProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.log(error)
    return null
  }

  return data
}