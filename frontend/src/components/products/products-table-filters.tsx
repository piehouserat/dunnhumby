"use client";

import { useQueryStates } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { productsSearchParams } from "@/lib/search-params";
import type { Category } from "@/lib/types";

interface ProductsTableFiltersProps {
  categories: Category[];
}

export function ProductsTableFilters({
  categories,
}: ProductsTableFiltersProps) {
  const [{ categoryId }, setSearchParams] = useQueryStates(
    productsSearchParams,
    {
      shallow: false,
    },
  );

  return (
    <div className="flex items-center gap-4">
      <Select
        value={categoryId}
        onValueChange={(value) => {
          setSearchParams({ categoryId: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {categoryId && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 lg:px-3"
          onClick={() => {
            setSearchParams({ categoryId: "" });
          }}
        >
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
