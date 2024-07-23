import type { ISchema } from "@formily/react";

import getDataSourceBindSchema from "../../getDataSourceBindSchema";
import getCompomentTypeInfoSchema from "@/schema-component/widgets/getCompomentTypeInfoSchema";

export const settingSchema: ISchema = getCompomentTypeInfoSchema({
  title: {
    type: "string",
    title: "标题",
    required: true,
    "x-decorator": "FormItem",
    "x-component": "Input",
  },
  subTitle: {
    type: "string",
    title: "副标题",
    required: true,
    "x-decorator": "FormItem",
    "x-component": "Input",
  },
  ...getDataSourceBindSchema(),
});
