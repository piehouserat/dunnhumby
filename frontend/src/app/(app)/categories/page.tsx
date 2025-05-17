import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/ui/data-table";
import { getCategories } from "@/lib/api-utils";

export default async function Categories() {
  const categories = await getCategories();

  return <DataTable columns={columns} data={categories} />;
}
