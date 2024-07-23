import type { ISchema } from "@formily/react";

import getCompomentTypeInfoSchema from "../../getCompomentTypeInfoSchema";

export const settingSchema: ISchema = getCompomentTypeInfoSchema(
  {
    // queryType: {
    //     'type': 'string',
    //     'title': '选择',
    //     'required': false,
    //     'x-decorator': 'FormItem',
    // },
  },
  {
    dependencies: undefined,
  },
);
