import type { ISchema } from '@formily/react'

const positionDecoratorFormItemSchema = {
  decoratorProps: {
    'type': 'object',
    'title': '位置/尺寸信息',
    'required': false,
    'x-decorator': 'FormItem',
    'x-component': 'PositionDecoratorFormItem',
  },
  decoratorPadding: {
    'name': 'decoratorProps',
    'type': 'array',
    'title': '间距',
    'required': false,
    'x-decorator': 'FormItem',
    'x-component': 'DecoratorPaddingFormItem',
  },
}

export const Header1SettingSchema: ISchema = {
  type: 'object',
  properties: {
    title: {
      'type': 'string',
      'title': '标题',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ...positionDecoratorFormItemSchema,
    dependencies: {
      'type': 'object',
      'title': '查询',
      'required': false,
      'x-decorator': 'FormItem',
      'x-component': 'DepFieldSetFormItem',
    },
  },
}
