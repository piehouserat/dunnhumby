import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  LayersIcon,
  ListIcon,
  Package2Icon,
  PackageIcon,
  PoundSterlingIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryTotals, Totals } from "@/lib/types";
import { CurrencyFormatter } from "../formatters";

interface StatsProps {
  totals: Totals;
  categoryTotals: CategoryTotals[];
}

export function Stats({ totals, categoryTotals = [] }: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Stock Value
          </CardTitle>
          <PoundSterlingIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CurrencyFormatter value={totals.totalStockValue} />
          </div>
          <p className="text-xs text-muted-foreground">
            Total value of all stock
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <PackageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totals.totalProductCount}</div>
          <p className="text-xs text-muted-foreground">
            Total number of products
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          <LayersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.totalStockQuantity.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Total quantity in stock
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <ListIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categoryTotals.length}</div>
          <p className="text-xs text-muted-foreground">Total categories</p>
        </CardContent>
      </Card>
    </div>
  );
}
