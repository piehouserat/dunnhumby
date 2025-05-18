"use client";

import type { CategoryTotals, ProductDailyStats, Totals } from "@/lib/types";
import { Header } from "../header";
import { DateRangePicker } from "../ui/date-range-picker";
import { ProductsOverTime } from "./products-over-time";
import { Stats } from "./stats";
import { useQueryStates } from "nuqs";
import { dateRangeSearchParams } from "@/lib/search-params";
import type { DateRange } from "react-day-picker";
import { startOfDay, parseISO, format } from "date-fns";
import { CategoryCharts } from "./category-charts";

export function Overview({
  totals,
  categoryTotals,
  productDailyStats,
}: {
  totals: Totals;
  categoryTotals: CategoryTotals[];
  productDailyStats: ProductDailyStats[];
}) {
  const [dateRange, setDateRange] = useQueryStates(dateRangeSearchParams, {
    shallow: false,
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setDateRange({
        from: format(startOfDay(range.from), "yyyy-MM-dd"),
        to: format(startOfDay(range.to || range.from), "yyyy-MM-dd"),
      });
    }
  };

  const dateRangeForPicker = dateRange.from
    ? {
        from: parseISO(dateRange.from),
        to: parseISO(dateRange.to),
      }
    : undefined;

  return (
    <>
      <Header
        actions={
          <DateRangePicker
            dateRange={dateRangeForPicker}
            onDateRangeChange={handleDateRangeChange}
          />
        }
      />
      <div className="flex flex-col gap-4">
        <Stats totals={totals} categoryTotals={categoryTotals} />
        <ProductsOverTime productDailyStats={productDailyStats} />
        <CategoryCharts categoryTotals={categoryTotals} />
      </div>
    </>
  );
}
