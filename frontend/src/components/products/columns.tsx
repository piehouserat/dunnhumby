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

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    header: "Price",
    cell: ({ row }) => <CurrencyFormatter value={row.original.price} />,
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock Quantity",
  },
  {
    header: "Date Added",
    cell: ({ row }) => <DateTimeFormatter value={row.original.dateAdded} />,
  },
  {
    id: "actions",
    enableHiding: false,
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
