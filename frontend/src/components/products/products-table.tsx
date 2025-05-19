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
  const [
    { page, pageSize: currentPageSize, orderBy, isDescending },
    setSearchParams,
  ] = useQueryStates(productsSearchParams, {
    shallow: false,
    clearOnDefault: true,
  });

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    setSearchParams({
      page: newPageIndex + 1,
      pageSize: newPageSize,
      orderBy,
      isDescending,
    });
  };

  const handleSortingChange = (
    newOrderBy: string,
    newIsDescending: boolean,
  ) => {
    setSearchParams({
      page: 1, // Reset to first page when sorting changes
      pageSize: currentPageSize,
      orderBy: newOrderBy,
      isDescending: newIsDescending,
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
      sorting={{
        orderBy: orderBy || "",
        isDescending: isDescending || false,
        onSortingChange: handleSortingChange,
      }}
    />
  );
}
