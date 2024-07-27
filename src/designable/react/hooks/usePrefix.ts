import { useLayout } from "./useLayout";

export function usePrefix(after = "") {
  return useLayout()?.prefixCls + after;
}
