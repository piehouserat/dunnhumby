import { columns } from "@/components/products/columns";
import { ProductsTable } from "@/components/products/products-table";
import { ProductsTableFilters } from "@/components/products/products-table-filters";
import { AddProductDialog } from "@/components/products/add-product-dialog";
import {
  getProducts,
  getCategories,
  type GetProductsParams,
  type OrderBy,
} from "@/lib/api-utils";
import { productsSearchParamsCache } from "@/lib/search-params";
import type { SearchParams } from "nuqs/server";
import { Header } from "@/components/header";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, pageSize, categoryId, orderBy, isDescending } =
    await productsSearchParamsCache.parse(searchParams);

  const getProductsParams: GetProductsParams = {
    page,
    pageSize,
    categoryId,
    orderBy: orderBy as OrderBy | undefined,
    isDescending,
  };

  const [{ data: products, total }, categories] = await Promise.all([
    getProducts(getProductsParams),
    getCategories(),
  ]);

  const pageCount = Math.ceil(total / pageSize);

  return (
    <>
      <Header
        actions={
          <div className="flex gap-4 items-center">
            <ProductsTableFilters categories={categories} />
            <AddProductDialog categories={categories} />
          </div>
        }
      />
      <ProductsTable columns={columns} data={products} pageCount={pageCount} />
    </>
  );
}
