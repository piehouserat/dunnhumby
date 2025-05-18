import { CategoriesTable } from "@/components/categories/categories-table";
import { columns } from "@/components/categories/columns";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/api-utils";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <>
      <Header
        actions={
          <div className="flex gap-4 items-center">
            <Button>Add Category</Button>
          </div>
        }
      />
      <CategoriesTable columns={columns} data={categories} />
    </>
  );
}
