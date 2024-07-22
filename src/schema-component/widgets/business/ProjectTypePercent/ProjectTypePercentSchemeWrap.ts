
import { Schema } from "@formily/react";
import { getCommonInitSchema } from "@/schema-component/core";


export function ProjectTypePercentSchemeWrap(inject: any = {}) {
    return new Schema({
        ...getCommonInitSchema(),
        "x-component": "ProjectTypePercent",
        ...inject,
        "x-decorator-props": {
            padding: [24, 12, 24, 12],
            w: 3,
            h: 3,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
    });
}