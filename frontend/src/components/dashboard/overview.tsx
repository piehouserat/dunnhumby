"use client";

import type { Totals } from "@/lib/types";
import { Header } from "../header";
import { DateRangePicker } from "../ui/date-range-picker";
import { ProductsOverTime } from "./products-over-time";
import { Stats } from "./stats";
import { useQueryStates } from "nuqs";
import { dateRangeSearchParams } from "@/lib/search-params";
import type { DateRange } from "react-day-picker";

export function Overview({ totals }: { totals: Totals }) {
  const [dateRange, setDateRange] = useQueryStates(dateRangeSearchParams, {
    shallow: false,
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setDateRange({
        from: range.from,
        to: range.to || range.from,
      });
    }
  };

  return (
    <>
      <Header
        actions={
          <DateRangePicker
            dateRange={
              dateRange.from
                ? { from: dateRange.from, to: dateRange.to }
                : undefined
            }
            onDateRangeChange={handleDateRangeChange}
          />
        }
      />
      <div className="flex flex-col gap-4">
        <Stats totals={totals} />
        <ProductsOverTime />
      </div>
    </>
  );
}
