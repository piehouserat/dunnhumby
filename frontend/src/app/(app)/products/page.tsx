import { columns } from "@/components/products/columns";
import { ProductsTable } from "@/components/products/products-table";
import { ProductsTableFilters } from "@/components/products/products-table-filters";
import {
  getProducts,
  getCategories,
  type GetProductsParams,
} from "@/lib/api-utils";
import { productsSearchParamsCache } from "@/lib/search-params";
import type { SearchParams } from "nuqs/server";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, pageSize, categoryId } =
    await productsSearchParamsCache.parse(searchParams);

  const getProductsParams: GetProductsParams = {
    page,
    pageSize,
    categoryId,
  };

  const [{ data: products, total }, categories] = await Promise.all([
    getProducts(getProductsParams),
    getCategories(),
  ]);

  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      <ProductsTableFilters categories={categories} />
      <ProductsTable columns={columns} data={products} pageCount={pageCount} />
    </div>
  );
}
