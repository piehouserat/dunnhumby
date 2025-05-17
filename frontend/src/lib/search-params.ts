import {
  parseAsInteger,
  parseAsString,
  createSearchParamsCache,
} from "nuqs/server";

export const productsSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  categoryId: parseAsString.withDefault(""),
};

export const productsSearchParamsCache =
  createSearchParamsCache(productsSearchParams);
