import type { ISchema } from '@formily/react'

export const positionDecoratorPropsSchema: ISchema = {

    type: 'object',
    properties: {
        tooltip: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        addonBefore: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        addonAfter: {
            'type': 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        labelCol: {
            'type': 'number',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
        },
        wrapperCol: {
            'type': 'number',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
        },
        labelWidth: {
            'x-decorator': 'FormItem',
            'x-component': 'SizeInput',
        },
        wrapperWidth: {
            'x-decorator': 'FormItem',
            'x-component': 'SizeInput',
        },
        colon: {
            'type': 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            'x-component-props': {
                defaultChecked: true,
            },
        },
        asterisk: {
            'type': 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
        },
        gridSpan: {
            'type': 'number',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
        },

    },

}
