import { Overview } from "@/components/dashboard/overview";
import {
  getCategoryTotals,
  getProductDailyStats,
  getProductTotals,
  type GetTotalsParams,
} from "@/lib/api-utils";
import type { SearchParams } from "nuqs/server";
import { format, startOfDay, endOfDay } from "date-fns";
import { dateRangeSearchParamsCache } from "@/lib/search-params";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { from, to } = await dateRangeSearchParamsCache.parse(searchParams);

  const totalsParams: GetTotalsParams = {
    startDate: format(startOfDay(from), "yyyy-MM-dd"),
    endDate: format(endOfDay(to), "yyyy-MM-dd"),
  };

  const [totals, categoryTotals, productDailyStats] = await Promise.all([
    getProductTotals(totalsParams),
    getCategoryTotals(totalsParams),
    getProductDailyStats(totalsParams),
  ]);

  return (
    <Overview
      totals={totals}
      categoryTotals={categoryTotals}
      productDailyStats={productDailyStats}
    />
  );
}
