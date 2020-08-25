import { request } from "../request.js";
//   path,
//   endpoint = "/",
//   base = new URL(endpoint, BASE).href,
//   url = new URL(`${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`).href,
//   method = "GET",
//   headers,
//   // headers = new Headers({
//   //   "content-type": APPLICATION_JSON,
//   //   accept: APPLICATION_JSON
//   // }),
//   payload,
//   jwt,
//   suppressFailure = false, // ie request not performed / fetch throws
//   sendJWT = ({ method, url }) => url && !/get|head/i.test(method),
//   host
// } = {}) => {

// curl -nXPOST https://api.npolar.no/user/authorize -d '{"system": "https://api.npolar.no/placename"}'
// {"status":200,"rights":["create","read","update","delete"]}

export const authorize = async ({
  system,
  jwt,
  email,
  password,
  host
} = {}) => {
  const path = "/user/authorize";
  const method = "POST";
  const payload = { system };
  if (jwt) {
    const r = await request({ path, method, payload, jwt, host });
    if (r.ok) {
      //emit...
      return r.json();
    }
  }
};
