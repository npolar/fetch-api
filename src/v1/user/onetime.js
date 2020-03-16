import base from "../base.js";
import { forceNpolarIfDomainIsMissing } from "./authenticate.js";
import { emitFetchError } from "../../error.js";
export const onetimeURI = new URL("/user/onetime", base).href;

const linkURL = (location, now = new Date().toJSON()) =>
  //new URL(`${location}
  new URL(
    `https://${location.host}/user/sign-in/?email={{user}}&p1={{code}}&when=${now}`
  ).href;
// maybe link to user profile and do sign in there...

const { stringify } = JSON;

export async function onetime({
  email,
  link = linkURL(document.location),
  uri = onetimeURI,
  method = "POST",
  host = window
} = {}) {
  email = forceNpolarIfDomainIsMissing(email);
  const body = stringify({ email, link });
  const r = await fetch(uri, { method, body });
  if (!r.ok) {
    emitFetchError({ response: r, host });
  }
  return r;
}
// Beware of weird status: {"status":500,"http_message":"Internal Server Error","error":"User Not found"}
