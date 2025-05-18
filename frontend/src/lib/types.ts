export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  productCode: string;
  price: number;
  sku: string;
  stockQuantity: number;
  dateAdded: string;
  categoryId: string;
  categoryName: string;
};

export type CreateProduct = {
  name: string;
  price: number;
  categoryId: string;
  productCode?: string;
  sku?: string;
  stockQuantity?: number;
};

export type Totals = {
  totalProductCount: number;
  totalStockQuantity: number;
  totalStockValue: number;
};

export type CategoryTotals = {
  categoryId: string;
  categoryName: string;
  productCount: number;
  stockQuantity: number;
  stockValue: number;
};

export type ProductDailyStats = {
  date: string;
  productsAdded: number;
  stockAdded: number;
};
