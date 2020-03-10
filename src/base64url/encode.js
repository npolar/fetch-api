import { stringify } from "./codec.js";
import { encoding } from "./encoding.js";

// The TextEncoder.prototype.encode() method takes a USVString as input,
// and returns a Uint8Array
const encodeText = s => new TextEncoder().encode(s);

export const encode = (s, opts, { textencoder = encodeText } = {}) =>
  stringify(textencoder(s), encoding, opts);
