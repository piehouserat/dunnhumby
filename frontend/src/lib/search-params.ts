import {
  parseAsInteger,
  parseAsString,
  createSearchParamsCache,
  parseAsIsoDate,
} from "nuqs/server";
import { getStartOfCurrentMonth, getToday } from "./date-utils";

export const productsSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  categoryId: parseAsString.withDefault(""),
};

export const dateRangeSearchParams = {
  from: parseAsIsoDate.withDefault(getStartOfCurrentMonth()),
  to: parseAsIsoDate.withDefault(getToday()),
};

export const productsSearchParamsCache =
  createSearchParamsCache(productsSearchParams);

export const dateRangeSearchParamsCache = createSearchParamsCache(
  dateRangeSearchParams,
);
