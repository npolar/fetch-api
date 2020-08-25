import v1base from "../base.js";
import { request } from "../request.js";

const getBase = (/*{ version }*/) => v1base;

const emit = ({ host, name, detail }) =>
  host.dispatchEvent(
    new CustomEvent(name, {
      detail
    })
  );

export const get = async ({
  id,
  endpoint,
  store,
  host,
  version = 1,
  base = getBase({ version })
} = {}) => {
  let v1, _rev;
  const path = `/${endpoint}/${id}`.replace(/\/{2}/g, "/");
  const url = new URL(path, base);

  // "Try" to get from store
  try {
    if (store && store.get) {
      v1 = await store.get(id);
      if (v1 && v1._rev) {
        emit({ host, name: "@npolar/get", detail: v1 });
        _rev = v1._rev;
      }
    }
  } catch (e) {
    // idb oftentimes throws errors, we just continue
    // no-op
  } finally {
    const headers = new Headers({
      accept: "application/json"
    });
    if (_rev) {
      headers.set("if-none-match", `"${_rev}"`);
    }

    const r = await request({
      path: id,
      // API/CORS config need to allow etag (or *) headers, or etag is not available for fetch
      // => Must use GET for now just to get _rev :/
      //const etag = r.headers.get("Etag");
      method: "get",
      suppressError: _rev !== undefined, // Emit fetch error only when there is no local revision
      headers,
      endpoint,
      host
    });
    if (r && r.ok) {
      const v1API = await r.json();
      if (_rev !== v1API._rev) {
        emit({ host, name: "@npolar/get", detail: v1API });
      }
    }
  }
};
