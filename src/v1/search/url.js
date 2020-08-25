import { config as searchConfig } from "./config.js";

// const params = new URLSearchParams(window.location.search);
export const searchURL = (params, { config = searchConfig } = {}) => {
  params = { ...config, ...params };
  const {
    base,
    endpoint,
    q,
    format = "json",
    variant = "feed",
    limit,
    sort,
    fields,
    facets,
    filters = new Map(),
    not = new Map(),
    ...rest
  } = params;
  let url = new URL(endpoint, base);
  url.searchParams.set("q", q || "");
  url.searchParams.set("format", format);
  url.searchParams.set("variant", variant);
  url.searchParams.set("limit", limit);
  if (sort) {
    url.searchParams.set("sort", sort);
  }
  if (fields) {
    url.searchParams.set("fields", fields);
  }
  if (facets) {
    url.searchParams.set("facets", facets);
  }
  for (const [k, v] of filters) {
    if (v !== undefined) {
      url.searchParams.set(`filter-${k}`, v);
    }
  }
  for (const [k, v] of not) {
    if (v !== undefined) {
      url.searchParams.set(`not-${k}`, v);
    }
  }
  for (const [k, v] of Object.entries(rest)) {
    if (v !== undefined) {
      url.searchParams.set(k, v);
    }
  }
  return url;
};
