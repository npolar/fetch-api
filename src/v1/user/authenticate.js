import base from "../base.js";
import { encode as base64urlencode } from "../../base64url/exports.js";
import { emitFetchError } from "../../error.js";

export const authenticateURI = new URL("/user/authenticate", base).href;

export const basicAuthorization = (username, password) =>
  `Basic ${base64urlencode(`${username}:${password}`)}`;

export const bearerAuthorization = jwt => `Bearer ${jwt}`;

export const forceNpolarIfDomainIsMissing = email => {
  email = String(email).trim();
  if (false === /[@]{1}/.test(email)) {
    email = email + "@npolar.no";
  }
  return email;
};

export async function authenticate({
  email,
  password,
  jwt,
  host = window
} = {}) {
  let r;
  if (email && email.length && password && password.length) {
    r = await signin(email, password);
  } else if (jwt) {
    r = await refresh(jwt);
  } else {
    throw "No credentials passed";
  }
  if (!r.ok) {
    emitFetchError({ response: r, host });
  }
  return r;
}

export async function refresh(jwt) {
  const headers = new Headers({
    authorization: `Bearer ${jwt}`
  });
  return fetch(authenticateURI, { headers });
}

export async function signin(username, password, {} = {}) {
  username = String(username).trim();
  password = String(password).trim();
  if (username.length > 0 && password.length > 0) {
    const email = forceNpolarIfDomainIsMissing(username);
    const headers = new Headers({
      authorization: basicAuthorization(email, password)
    });
    return fetch(authenticateURI, { headers });
  }
  throw "Missing username or password";
}
