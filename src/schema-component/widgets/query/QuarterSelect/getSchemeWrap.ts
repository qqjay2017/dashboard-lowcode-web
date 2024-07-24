import { Schema } from '@formily/react'
import { getCommonInitSchema } from '@/schema-component/core'

export function getSchemeWrap(inject: any = {}) {
  return new Schema({
    ...getCommonInitSchema(),
    'type': 'object',
    'name': 'quarterSelect',
    'x-component': 'QuarterSelect',
    'x-component-props': {
      defaultCurrentQuarter: true,
      ...inject?.['x-component-props'],
    },
    ...inject,
    'x-decorator-props': {
      padding: [0, 0, 0, 0],
      w: 1.5,
      h: 0.5,
      ...inject?.['x-decorator-props'],
      // padding: 0
    },
    'x-reactions': ['{{useAsyncQuarterDataSource(currentQuarter)}}'],

  })
}
