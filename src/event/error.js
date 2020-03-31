import { emit } from "./emit.js";
import { detail } from "./detail.js";
const FETCH_ERROR = "fetch-error";

export const emitFetchError = async ({
  response,
  method,
  host,
  name = FETCH_ERROR
} = {}) => emit({ host, name, detail: detail({ response, method }) });
