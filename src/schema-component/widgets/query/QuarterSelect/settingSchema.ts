import type { ISchema } from "@formily/react";

import getCompomentTypeInfoSchema from "../../getCompomentTypeInfoSchema";

export const settingSchema: ISchema = getCompomentTypeInfoSchema(
  {
    queryType: {
      type: "string",
      title: "查询类型",
      required: false,
      "x-decorator": "FormItem",
    },
    defaultCurrentQuarter: {
      type: "boolearn",
      title: "默认选中本季度",
      required: false,
      defaultValue: true,
      "x-decorator": "FormItem",
      "x-component": "Switch",
    },
  },
  {
    dependencies: undefined,
  },
);
