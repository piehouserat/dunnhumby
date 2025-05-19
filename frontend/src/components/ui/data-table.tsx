import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  sorting?: {
    orderBy: string;
    isDescending: boolean;
    onSortingChange: (orderBy: string, isDescending: boolean) => void;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  sorting,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      ...(pageCount !== undefined && {
        pagination: {
          pageIndex: pageIndex ?? 0,
          pageSize: pageSize ?? 10,
        },
      }),
      ...(sorting && {
        sorting: [
          {
            id: sorting.orderBy,
            desc: sorting.isDescending,
          },
        ],
      }),
    },
    ...(pageCount !== undefined && {
      pageCount,
      onPaginationChange: (updater) => {
        if (typeof updater === "function") {
          const newState = updater({
            pageIndex: pageIndex ?? 0,
            pageSize: pageSize ?? 10,
          });
          onPaginationChange?.(newState.pageIndex, newState.pageSize);
        } else {
          onPaginationChange?.(updater.pageIndex, updater.pageSize);
        }
      },
      manualPagination: true,
    }),
    ...(sorting && {
      onSortingChange: (updater) => {
        if (typeof updater === "function") {
          const newState = updater([
            {
              id: sorting.orderBy,
              desc: sorting.isDescending,
            },
          ]);
          sorting.onSortingChange(newState[0].id, newState[0].desc);
        } else {
          sorting.onSortingChange(updater[0].id, updater[0].desc);
        }
      },
      manualSorting: true,
    }),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageCount !== undefined && <DataTablePagination table={table} />}
    </div>
  );
}
