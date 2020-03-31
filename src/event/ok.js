import { emit } from "./emit.js";
import { detail } from "./detail.js";
export const FETCH_OK = "fetch-ok";

// PUT resooonse body (v1:
// { ok: true, id: "e3ccb84d-6f89-46fe-b122-1297ac528f7f", rev: "12-eff13f1c769540e63223e2284a705430 }

export const emitFetchOK = async ({
  response,
  method,
  host,
  name = FETCH_OK
} = {}) => emit({ host, name, detail: detail({ response, method }) });
