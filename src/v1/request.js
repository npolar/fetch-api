import BASE from "./base.js";
export { BASE as base };
import { emitFetchOK } from "../event/ok.js";
import { emitFetchError } from "../event/error.js";

const { stringify } = JSON;

const APPLICATION_JSON = "application/json";

export const request = async ({
  path,
  base = BASE,
  url = new URL(`${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).href,
  method = "GET",
  headers = new Headers({
    "content-type": APPLICATION_JSON,
    accept: APPLICATION_JSON
  }),
  payload,
  jwt,
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
  });
  if (host) {
    if (!response || !response.ok) {
      emitFetchError({ response, method, host });
    } else if (/put|post|delete/i.test(method)) {
      emitFetchOK({ response, method, host });
    }
  }
  return response;
};
