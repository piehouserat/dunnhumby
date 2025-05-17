"use client";

import { useQueryStates } from "nuqs";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { productsSearchParams } from "@/lib/search-params";

interface ProductsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
}

export function ProductsTable<TData, TValue>({
  columns,
  data,
  pageCount,
}: ProductsTableProps<TData, TValue>) {
  const [{ page, pageSize: currentPageSize }, setSearchParams] = useQueryStates(
    productsSearchParams,
    { shallow: false, clearOnDefault: true },
  );

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    setSearchParams({
      page: newPageIndex + 1,
      pageSize: newPageSize,
    });
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      pageIndex={page - 1}
      pageSize={currentPageSize}
      onPaginationChange={handlePaginationChange}
    />
  );
}
