export const toggleDirection = (current = "") =>
  current.startsWith("-") ? current.replace("-", "") : `-${current}`;
