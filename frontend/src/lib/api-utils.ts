import type { Category, Product } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const categories = await fetch(`${baseUrl}/categories`);
  const categoriesData: Category[] = await categories.json();

  return categoriesData;
}

export type GetProductsParams = {
  page?: number;
  pageSize?: number;
  categoryId?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

function createQueryString(
  params: Record<string, string | number | null | undefined>,
): string {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value != null && value !== "",
    ),
  );
  return new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();
}

export async function getProducts(
  params: GetProductsParams,
): Promise<PaginatedResponse<Product>> {
  const queryString = `${baseUrl}/products?${createQueryString(params)}`;
  const products = await fetch(queryString);
  const productsData: PaginatedResponse<Product> = await products.json();

  return productsData;
}
