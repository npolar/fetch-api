import base from "../base.js";
import { request as get } from "../request.js";
import { encode as base64urlencode } from "../../base64url/exports.js";
import { emit } from "../../event/emit.js";
import { payload } from "../../jwt.js";

const SIGNIN_EVENT = "@npolar/sign-in";

export const authenticateURI = new URL("/user/authenticate", base).href;

export const basicAuthorization = (email, password) =>
  `Basic ${base64urlencode(`${email}:${password}`)}`;

export const bearerAuthorization = jwt => `Bearer ${jwt}`;

export const forceNpolarIfDomainIsMissing = email => {
  email = String(email).trim();
  if (false === /[@]{1}/.test(email)) {
    email = email + "@npolar.no";
  }
  return email;
};

export async function authenticate({ email, password, jwt, host } = {}) {
  let r;

  if (email && email.length && password && password.length) {
    r = await signin({ email, password, host });
  } else if (jwt) {
    r = await refresh({ jwt, host });
  } else {
    throw "No credentials passed";
  }
  return r;
}

export async function refresh({ jwt, host } = {}) {
  const headers = {
    authorization: bearerAuthorization(jwt)
  };
  return get({ url: authenticateURI, headers, host });
}

export async function signin({ email, password, host } = {}) {
  email = String(email || "").trim();
  password = String(password || "").trim();
  if (email.length === 0 || password.length === 0) {
    throw "Missing email or password";
  }
  email = forceNpolarIfDomainIsMissing(email);
  const headers = {
    authorization: basicAuthorization(email, password)
  };
  const r = await get({ url: authenticateURI, headers, host });
  if (r.ok) {
    const { token } = await r.json();
    const user = payload(token);
    emit({ host, name: SIGNIN_EVENT, detail: { jwt: token, user } });
  }
}
