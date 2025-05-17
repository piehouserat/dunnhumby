"use client";

import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface CategoriesTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CategoriesTable<TData, TValue>({
  columns,
  data,
}: CategoriesTableProps<TData, TValue>) {
  return <DataTable columns={columns} data={data} />;
}
