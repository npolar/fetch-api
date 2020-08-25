import { request } from "../request.js";

// curl -nXPOST https://api.npolar.no/user/authorize -d '{"system": "https://api.npolar.no/placename"}'
// {"status":200,"rights":["create","read","update","delete"]}

export const authorize = async ({
  system,
  jwt,
  //email,
  //password,
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
