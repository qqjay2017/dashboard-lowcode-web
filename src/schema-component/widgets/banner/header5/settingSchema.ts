import type { ISchema } from "@formily/react";

import getDataSourceBindSchema from "../../getDataSourceBindSchema";
import getCompomentTypeInfoSchema from "@/schema-component/widgets/getCompomentTypeInfoSchema";

export const settingSchema: ISchema = getCompomentTypeInfoSchema({
  ...getDataSourceBindSchema(),
});
