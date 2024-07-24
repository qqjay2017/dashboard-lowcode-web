import type { ISchema } from '@formily/react'

export const dashboardRootFormSchema: ISchema = {
  type: 'object',
  properties: {
    designWidthEnum: {
      'type': 'string',
      'title': '设计稿尺寸',
      'required': true,
      'default': '1920',
      'x-decorator': 'FormItem',
      'x-component': 'DesignWidthEnumSelect',
      'x-component-props': {
        disabled: true,
      },
    },
    themeProvider: {
      'type': 'string',
      'title': '主题颜色',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'ColorTypeSelect',
    },
    isDarkTheme: {
      'type': 'boolearn',
      'title': '主题风格',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'IsDarkThemeSelect',
    },
  },
}
