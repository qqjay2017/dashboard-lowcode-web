import { Schema } from "@formily/react";
import { getCommonInitSchema } from "@/schema-component/core";

export function getSchemeWrap(inject: any = {}) {
  return new Schema({
    ...getCommonInitSchema(),
    "x-component": "SmartHelmet",
    ...inject,
    "x-decorator-props": {
      padding: [16, 16, 16, 16],
      w: 3,
      h: 3,
      ...inject?.["x-decorator-props"],
      // padding: 0
    },
  });
}
