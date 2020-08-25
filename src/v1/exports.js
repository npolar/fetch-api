export * from "./base.js";
export * from "./request.js";
export * from "./get.js";
export * from "./put.js";
export * from "./search/search.js";
export * from "./search/url.js";
export * from "./search/facet-entries.js";

export const isAPIv1Param = k => /^q|sort|facets|limit|format|variant$/.test(k);
