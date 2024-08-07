export function removeBgValue(value: any) {
  // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
  const matched = String(value).match(/url\(\s*([^)]+)\s*\)/);
  if (matched?.[1]) {
    return matched?.[1];
  }
  return value;
}

export function addBgValue(value: any) {
  if (/url\([^)]+\)/.test(value)) {
    return value;
  }
  return `url(${value})`;
}
