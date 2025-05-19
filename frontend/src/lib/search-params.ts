import {
  parseAsInteger,
  parseAsString,
  createSearchParamsCache,
  parseAsIsoDate,
  parseAsBoolean,
} from "nuqs/server";
import { getStartOfPreviousMonth, getToday } from "./date-utils";
import { startOfDay, format } from "date-fns";

export const productsSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(20),
  categoryId: parseAsString.withDefault(""),
  orderBy: parseAsString.withDefault("dateAdded"),
  isDescending: parseAsBoolean.withDefault(true),
};

export const dateRangeSearchParams = {
  from: parseAsString.withDefault(
    format(startOfDay(getStartOfPreviousMonth()), "yyyy-MM-dd"),
  ),
  to: parseAsString.withDefault(format(startOfDay(getToday()), "yyyy-MM-dd")),
};

export const productsSearchParamsCache =
  createSearchParamsCache(productsSearchParams);

export const dateRangeSearchParamsCache = createSearchParamsCache(
  dateRangeSearchParams,
);
