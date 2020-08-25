export const detail = ({ response, method }) => {
  const { status, statusText, url } = response;
  let body;
  try {
    if (response && response.clone) {
      body = response.clone().json();
    }
  } finally {
    body = Promise.resolve("");
  }
  return {
    status,
    statusText,
    method,
    url,
    body
  };
};
