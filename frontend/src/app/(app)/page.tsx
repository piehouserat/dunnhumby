import { Overview } from "@/components/dashboard/overview";
import { getTotals, type GetTotalsParams } from "@/lib/api-utils";
import { parseAsString, type SearchParams } from "nuqs/server";
import { getStartOfCurrentMonth, getToday } from "@/lib/date-utils";
import { format } from "date-fns";
import { dateRangeSearchParamsCache } from "@/lib/search-params";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { from, to } = await dateRangeSearchParamsCache.parse(searchParams);

  const totalsParams: GetTotalsParams = {
    startDate: format(from, "yyyy-MM-dd"),
    endDate: format(to, "yyyy-MM-dd"),
  };

  const totals = await getTotals(totalsParams);

  return <Overview totals={totals} />;
}
