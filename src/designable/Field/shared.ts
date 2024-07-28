import type { ISchema } from '@formily/react'
import { ReactionsSetter } from '../setters'
import { positionDecoratorPropsSchema } from './positionDecoratorPropsSchema'

const CSSStyle: ISchema = {
    type: 'void',
    properties: {
        'style.width': {
            'type': 'string',
            'x-decorator': 'FormItem',
            'x-component': 'SizeInput',
        },
        'style.height': {
            'type': 'string',
            'x-decorator': 'FormItem',
            'x-component': 'SizeInput',
        },
        'style.display': {
            'x-component': 'DisplayStyleSetter',
        },
        'style.background': {
            'x-component': 'BackgroundStyleSetter',
        },
        'style.boxShadow': {
            'x-component': 'BoxShadowStyleSetter',
        },
        'style.font': {
            'x-component': 'FontStyleSetter',
        },
        'style.margin': {
            'x-component': 'BoxStyleSetter',
        },
        'style.padding': {
            'x-component': 'BoxStyleSetter',
        },
        'style.borderRadius': {
            'x-component': 'BorderRadiusStyleSetter',
        },
        'style.border': {
            'x-component': 'BorderStyleSetter',
        },
        'style.opacity': {
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
                defaultValue: 1,
                min: 0,
                max: 1,
                step: 0.01,
            },
        },
    },
}

function createComponentSchema(component: ISchema['properties'], decorator: ISchema) {
    return {
        'component-group': component && {
            'title': '组件属性',
            'type': 'void',
            'x-component': 'CollapseItem',
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-component"]}}',
                    },
                },
            },
            'properties': {
                'x-component-props': {
                    type: 'object',
                    properties: {
                        ...(component as any),
                        dataSource: {
                            'type': 'object',
                            'title': '数据源',
                            'required': false,
                            'x-decorator': 'FormItem',
                            'x-component': 'DataSourceBind',
                        },

                    },

                },
            },
        },
        'decorator-group': decorator && {
            'title': '容器属性',
            'type': 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-decorator"]}}',
                    },
                },
            },
            'properties': {
                'x-decorator-props': decorator,
            },
        },
        'component-style-group': {
            'title': '组件样式',
            'type': 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-component"]}}',
                    },
                },
            },
            'properties': {
                'x-component-props.style': CSSStyle,
            },
        },
        'decorator-style-group': {
            'title': '容器样式',
            'type': 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-decorator"]}}',
                    },
                },
            },
            'properties': {
                'x-decorator-props.style': CSSStyle,
            },
        },
    }
}

export function createFieldSchema(component?: ISchema['properties'], decorator: ISchema = positionDecoratorPropsSchema): ISchema {
    return {
        type: 'object',
        properties: {
            'field-group': {
                'title': '字段属性',
                'type': 'void',
                'x-component': 'CollapseItem',
                'properties': {

                    // 'x-display': {
                    //     'type': 'string',
                    //     'enum': ['visible', 'hidden', 'none', ''],
                    //     'x-decorator': 'FormItem',
                    //     'x-component': 'Select',
                    //     'x-component-props': {
                    //         defaultValue: 'visible',
                    //     },
                    // },

                    'x-reactions': {
                        'x-decorator': 'FormItem',
                        'x-component': 'ReactionsSetter',
                    },

                },
            },
            ...createComponentSchema(component, decorator),
        },
    }
}
