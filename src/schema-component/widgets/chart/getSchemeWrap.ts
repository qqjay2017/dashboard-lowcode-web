import { Schema } from "@formily/react";
import { getCommonInitSchema } from "@/schema-component/core";

export function getSchemeWrap(inject: any = {}) {
    return new Schema({
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",
        "x-component": "ChartTemplate",
        "x-settings": "settings:block",
        "x-decorator": "PositionDecorator",
        "x-component-props": {
            ...inject?.["x-component-props"],
        },
        "x-reactions": {
            dependencies: {
                'projectSelect': 'projectSelect',
                'quarterSelect': 'quarterSelect',
            },
            when: true,
            fulfill: {
                schema: {
                    'x-component-props.query': '{{$deps}}'
                },
            },
        },
        ...inject,
        "x-decorator-props": {
            padding: [0, 0, 0, 0],
            w: 3,
            h: 3,
            ...inject?.["x-decorator-props"],
        },
    });
}
