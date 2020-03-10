import { decode as b64urldecode } from "./base64url/exports.js";

const { parse } = JSON;

export const jwtRegex = /^[a-z0-9-_=]+\.[a-z0-9-_=]+\.?[a-z0-9-_.+/=]*$/i;

export const isValid = (jwt, { regex = jwtRegex } = {}) => {
  if (!jwt || !regex.test(String(jwt))) {
    return false;
  }
  const { exp } = payload(jwt);
  if (exp) {
    const now = parseInt(Date.now() / 1000);
    return exp > now;
  }
  return false;
};

export const decode = jwt => {
  const p = jwt.split(".");
  const [header, payload] = p
    .slice(0, 2)
    .map(b64 => b64urldecode(b64))
    .map(o => parse(o));
  const signature = p[2];
  return [header, payload, signature];
};

export const payload = jwt => decode(jwt)[1];
