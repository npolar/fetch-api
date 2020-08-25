export const emit = ({
  host,
  name,
  detail,
  bubbles = true,
  composed = true,
  cancelable = false
}) => {
  const event = new CustomEvent(name, {
    detail,
    bubbles,
    composed,
    cancelable
  });
  host.dispatchEvent(event);
};
