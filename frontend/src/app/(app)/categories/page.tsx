import { CategoriesTable } from "@/components/categories/categories-table";
import { columns } from "@/components/categories/columns";
import { getCategories } from "@/lib/api-utils";

export default async function Categories() {
  const categories = await getCategories();

  return <CategoriesTable columns={columns} data={categories} />;
}
