import type {
  Category,
  CategoryTotals,
  CreateProduct,
  Product,
  ProductDailyStats,
  Totals,
} from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const categories = await fetch(`${baseUrl}/categories`);
  const categoriesData: Category[] = await categories.json();

  return categoriesData;
}

export type OrderBy =
  | "name"
  | "price"
  | "category"
  | "stockQuantity"
  | "dateAdded";

export type GetProductsParams = {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  orderBy?: OrderBy;
  isDescending?: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

function createQueryString(
  params: Record<string, string | number | null | undefined | boolean>,
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

export async function createProduct(product: CreateProduct) {
  const response = await fetch(`${baseUrl}/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export type GetTotalsParams = {
  startDate?: string;
  endDate?: string;
};

export async function getProductTotals(params: GetTotalsParams) {
  const response = await fetch(
    `${baseUrl}/products/totals?${createQueryString(params)}`,
  );
  const productTotals: Totals = await response.json();

  return productTotals;
}

export async function getCategoryTotals(params: GetTotalsParams) {
  const response = await fetch(
    `${baseUrl}/categories/totals?${createQueryString(params)}`,
  );
  const categoryTotals: CategoryTotals[] = await response.json();

  return categoryTotals;
}

export async function getProductDailyStats(params: GetTotalsParams) {
  const response = await fetch(
    `${baseUrl}/products/daily-stats?${createQueryString(params)}`,
  );
  const productDailyStats: ProductDailyStats[] = await response.json();

  return productDailyStats;
}
