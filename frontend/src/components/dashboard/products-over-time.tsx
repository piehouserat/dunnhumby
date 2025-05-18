"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ProductDailyStats } from "@/lib/types";
import { useQueryStates } from "nuqs";
import { dateRangeSearchParams } from "@/lib/search-params";
import { format } from "date-fns";

const chartConfig = {
  productsAdded: {
    label: "Products Added",
    color: "var(--chart-1)",
  },
  stockAdded: {
    label: "Stock Added",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ProductsOverTime({
  productDailyStats = [],
}: {
  productDailyStats: ProductDailyStats[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("productsAdded");
  const total = React.useMemo(
    () => ({
      productsAdded: productDailyStats.reduce(
        (acc, curr) => acc + curr.productsAdded,
        0,
      ),
      stockAdded: productDailyStats.reduce(
        (acc, curr) => acc + curr.stockAdded,
        0,
      ),
    }),
    [productDailyStats],
  );

  const [dateRange] = useQueryStates(dateRangeSearchParams, {
    shallow: false,
  });

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row pb-0!">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Product Stats</CardTitle>
          <CardDescription>
            Showing {chartConfig[activeChart].label} for the period of{" "}
            {`${format(dateRange.from, "MMM d, yyyy")} - ${format(
              dateRange.to,
              "MMM d, yyyy",
            )}`}
          </CardDescription>
        </div>
        <div className="flex">
          {["productsAdded", "stockAdded"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                type="button"
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={productDailyStats}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="productsAdded"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
