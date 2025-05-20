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
import { FilterIcon, XIcon } from "lucide-react";
import { productsSearchParams } from "@/lib/search-params";
import type { Category } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 border-dashed", categoryId && "border-solid")}
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filters
            {categoryId && (
              <div className="ml-2 rounded-full bg-secondary px-1 text-xs">
                1
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-4">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Filters</h4>
            <div className="space-y-2">
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setSearchParams({ categoryId: value });
                }}
              >
                <SelectTrigger>
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
            </div>
          </div>
        </PopoverContent>
      </Popover>
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
