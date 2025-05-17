import { columns } from "@/components/products/columns";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "@/lib/api-utils";

export default async function Products() {
  const products = await getProducts();

  return <DataTable columns={columns} data={products} />;
}
