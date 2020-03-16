import { config as searchConfig } from "./config.js";

// const params = new URLSearchParams(window.location.search);
export const searchURL = (params, { config = searchConfig } = {}) => {
  params = { ...config, ...params };
  const {
    base,
    endpoint,
    q,
    format,
    variant,
    limit,
    sort,
    fields,
    filters = new Map(),
    not = new Map()
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
  return url;
};
