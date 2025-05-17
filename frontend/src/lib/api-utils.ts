import type { Category, Product } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const categories = await fetch(`${baseUrl}/categories`);
  const categoriesData: Category[] = await categories.json();

  return categoriesData;
}

export async function getProducts() {
  const products = await fetch(`${baseUrl}/products`);
  const productsData: Product[] = await products.json();

  return productsData;
}
