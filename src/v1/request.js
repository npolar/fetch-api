import BASE from "./base.js";
export { BASE as base };
import { emitFetchOK } from "../event/ok.js";
import { emitFetchError } from "../event/error.js";

const { stringify } = JSON;

const APPLICATION_JSON = "application/json";

// @todo harmonise with searchURL
// let url = new URL(endpoint, base);
export const request = async ({
  path,
  endpoint = "/",
  base = new URL(endpoint, BASE).href,
  url = new URL(`${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).href,
  method = "GET",
  headers = new Headers({
    "content-type": APPLICATION_JSON,
    accept: APPLICATION_JSON
  }),

  payload,
  jwt,
  suppressFailure = false, // ie request not performed / fetch throws
  sendJWT = ({ method, url }) => url && !/get|head/i.test(method),
  host
} = {}) => {
  // create new reqyest?
  // Remove JWT for GET,HEAD unless switched on
  if (jwt && sendJWT({ url, method })) {
    headers.set("authorization", `Bearer ${jwt}`);
  }
  const response = await fetch(url, {
    method,
    headers,
    body: stringify(payload)
  }).catch(() => {
    if (host && !suppressFailure) {
      emitFetchError({
        response: { status: 0, statusText: "Fetch failed", url },
        method,
        host
      });
    }
  });
  if (host && response) {
    if (!response.ok) {
      emitFetchError({ response, method, host });
    } else if (/put|post|delete/i.test(method)) {
      emitFetchOK({ response, method, host });
    }
  }
  return response;
};
