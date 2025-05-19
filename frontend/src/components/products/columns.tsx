"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { CurrencyFormatter, DateTimeFormatter } from "../formatters";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { deleteProductAction } from "@/actions/delete-product-action";
import { DataTableColumnHeader } from "../ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    enableSorting: true,
  },
  {
    id: "category",
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader title="Category" column={column} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader title="Price" column={column} />
    ),
    cell: ({ row }) => <CurrencyFormatter value={row.original.price} />,
    enableSorting: true,
  },
  {
    accessorKey: "stockQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader title="Stock Quantity" column={column} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => (
      <DataTableColumnHeader title="Date Added" column={column} />
    ),
    cell: ({ row }) => <DateTimeFormatter value={row.original.dateAdded} />,
    enableSorting: true,
  },
  {
    accessorKey: "productCode",
    header: ({ column }) => (
      <DataTableColumnHeader title="Product Code" column={column} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader title="SKU" column={column} />
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const product = row.original;

      const deleteAction = useAction(deleteProductAction, {
        onSuccess: () => {
          toast.success("Product deleted successfully");
        },
        onError: (error) => {
          toast.error("Failed to delete product");
        },
      });

      const handleDelete = () => {
        deleteAction.execute({ id: product.id });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(product.id);

                toast.success("Product ID copied to clipboard");
              }}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/settings/categories/${product.id}/edit`}>
                Edit product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
