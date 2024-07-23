import type { ISchema } from "@formily/react";
import getDataSourceBindSchema from "../../getDataSourceBindSchema";

import getCompomentTypeInfoSchema from "../../getCompomentTypeInfoSchema";

export const HeaderMenuSettingSchema: ISchema = getCompomentTypeInfoSchema({
  ...getDataSourceBindSchema(),
});
