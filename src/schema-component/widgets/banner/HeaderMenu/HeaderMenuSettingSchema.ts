import type { ISchema } from "@formily/react";
import { getDataSourceBindSchema } from "@/schema-component/components";
import { getCompomentTypeInfoSchema } from "@/schema-component/components/DashboardRoot/setting-schema";




export const HeaderMenuSettingSchema: ISchema = getCompomentTypeInfoSchema({
    ...getDataSourceBindSchema(),
})


