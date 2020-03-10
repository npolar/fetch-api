import base from "../base.js";
import { forceNpolarIfDomainIsMissing } from "./authenticate.js";

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
  method = "POST"
}) {
  email = forceNpolarIfDomainIsMissing(email);
  const body = stringify({ email, link });
  return fetch(uri, { method, body });
}
// Beware of weird status: {"status":500,"http_message":"Internal Server Error","error":"User Not found"}
