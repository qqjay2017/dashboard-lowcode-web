import { isFn, isStr } from "./types";
import { globalThisPolyfill } from "./globalThisPolyfill";

export function instOf(value: any, cls: any) {
  if (isFn(cls)) return value instanceof cls;
  if (isStr(cls)) {
    return globalThisPolyfill[cls]
      ? value instanceof globalThisPolyfill[cls]
      : false;
  }
  return false;
}
