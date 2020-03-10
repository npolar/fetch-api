// Thanks MDN :)
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Processing_a_text_file_line_by_line
export async function* fetchSplit(url, { parse = JSON.parse } = {}) {
  const re = /\n|\r|\r\n/g;
  const utf8Decoder = new TextDecoder("utf-8");
  let response = await fetch(url);

  if (!response.ok) {
    throw "HTTP Error";
  }

  let reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : "";
  let startIndex = 0;
  //let result;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      let remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }

    const line = chunk.substring(startIndex, result.index);
    const parsed = parse(line);
    startIndex = re.lastIndex;
    yield parsed;
  }
  if (startIndex < chunk.length) {
    // last line didn't end in a newline char
    yield parse(chunk.substr(startIndex));
  }
}
