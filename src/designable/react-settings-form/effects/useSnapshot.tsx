import { onFieldInputValueChange } from "@formily/core";
import type { Operation } from "@/designable/core";

let timeRequest = null;

export function useSnapshot(operation: Operation) {
  onFieldInputValueChange("*", (field) => {
    console.log(field, "field222");
    clearTimeout(timeRequest);
    timeRequest = setTimeout(() => {
      operation.snapshot("update:node:props");
    }, 1000);
  });
}
