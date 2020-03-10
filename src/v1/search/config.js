import base from "../base.js";
export const config = {
  base,
  endpoint: undefined,
  fields: undefined,
  q: "",
  format: "json",
  variant: "array",
  limit: 10,
  sort: undefined,
  filters: new Map(),
  not: new Map()
};
