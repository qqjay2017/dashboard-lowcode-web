export function safeArraySelect(arr) {
  return Array.isArray(arr) ? arr : [];
}

export function safeObjectSelect<TData>(obj: TData) {
  if (!obj || obj === null || obj === undefined) {
    return {} as TData;
  }
  return obj as TData;
}
