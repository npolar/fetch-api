import { parse } from "./codec.js";
import { encoding } from "./encoding.js";

// The TextDecoder.prototype.decode() method returns a DOMString containing the text
const decodeUint8Array = u8a => new TextDecoder().decode(u8a);

export const decode = (s, opts, { arraydecoder = decodeUint8Array } = {}) => {
  const pad = new Map([
    [0, ""],
    [1, "==="],
    [2, "=="],
    [3, "="]
  ]);
  const padded = s + pad.get(s.length % 4);
  // opts.loose=true => might also be used instead of prepadding
  return arraydecoder(parse(padded, encoding, opts));
};
