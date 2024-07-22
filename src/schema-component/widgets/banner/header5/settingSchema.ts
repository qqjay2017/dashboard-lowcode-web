import type { ISchema } from "@formily/react";
import { getCompomentTypeInfoSchema } from "@/schema-component/components/DashboardRoot/setting-schema";
import { getDataSourceBindSchema } from "@/schema-component";



export const settingSchema: ISchema = getCompomentTypeInfoSchema({
    ...getDataSourceBindSchema(),
})

