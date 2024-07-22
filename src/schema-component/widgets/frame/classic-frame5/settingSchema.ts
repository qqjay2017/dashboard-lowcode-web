import type { ISchema } from "@formily/react";
import { getCompomentTypeInfoSchema } from "@/schema-component/components/DashboardRoot/setting-schema";



export const settingSchema: ISchema = getCompomentTypeInfoSchema(
    {
        title: {
            type: "string",
            title: "标题",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",

        },
    }
)

