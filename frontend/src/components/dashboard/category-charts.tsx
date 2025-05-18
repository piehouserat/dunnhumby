import type { CategoryTotals } from "@/lib/types";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dateRangeSearchParams } from "@/lib/search-params";
import { useQueryStates } from "nuqs";
import { format } from "date-fns";

const chartConfig = {
  stockQuantity: {
    label: "Stock Quantity",
    color: "var(--chart-3)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

interface CategoryChartsProps {
  categoryTotals: CategoryTotals[];
}

export function CategoryCharts({ categoryTotals = [] }: CategoryChartsProps) {
  const [dateRange] = useQueryStates(dateRangeSearchParams, {
    shallow: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Stock</CardTitle>
        <CardDescription>
          Showing stock quantity for the period of{" "}
          {`${format(dateRange.from, "MMM d, yyyy")} - ${format(
            dateRange.to,
            "MMM d, yyyy",
          )}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={categoryTotals}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="categoryName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="stockQuantity" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="stockQuantity"
              layout="vertical"
              fill="var(--color-stockQuantity)"
            >
              <LabelList
                dataKey="categoryName"
                position="insideLeft"
                offset={8}
                className="fill-[var(--color-label)]"
                fontSize={12}
              />
              <LabelList
                dataKey="stockQuantity"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
