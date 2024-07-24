import { Schema } from '@formily/react'

export function getSchemeWrap(inject: any = {}) {
  return new Schema({
    '_isJSONSchemaObject': true,
    'version': '2.0',
    'type': 'void',
    'x-component': 'ClassicFrame5',
    'x-settings': 'settings:block',
    'x-decorator': 'PositionDecorator',
    'x-component-props': {
      title: '默认标题',
      ...inject?.['x-component-props'],
    },
    ...inject,
    'x-decorator-props': {
      padding: [0, 0, 0, 0],
      w: 3,
      h: 3,
      ...inject?.['x-decorator-props'],
    },
  })
}
