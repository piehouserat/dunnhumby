import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Totals } from "@/lib/types";

interface StatsProps {
  totals: Totals;
}

export function Stats({ totals }: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Stock Value
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totals.totalStockValue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Total value of all stock
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
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
          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
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
          <ActivityIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totals.categoryTotals.length}
          </div>
          <p className="text-xs text-muted-foreground">Total categories</p>
        </CardContent>
      </Card>
    </div>
  );
}
