import { Schema } from '@formily/react'
import { getCommonInitSchema } from '@/schema-component/core'

export function ProjectBudgetSchemeWrap(inject: any = {}) {
  return new Schema({
    ...getCommonInitSchema(),
    'x-component': 'ProjectBudget',
    ...inject,
    'x-decorator-props': {
      padding: [12, 12, 12, 12],
      w: 3,
      h: 3,
      ...inject?.['x-decorator-props'],
      // padding: 0
    },
  })
}
