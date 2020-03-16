import { emit } from "./emit.js";

const FETCH_ERROR = "fetch-error";

export const emitFetchError = async ({ response, host = window } = {}) => {
  const { status, statusText } = response;
  let error;
  try {
    error = await response.clone().json();
  } finally {
    emit(host, FETCH_ERROR, {
      status,
      statusText: statusText,
      error
    });
  }
};
