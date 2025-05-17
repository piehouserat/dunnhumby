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
