import { Schema } from '@formily/react'
import { getCommonInitSchema } from '@/schema-component/core'

export function getSchemeWrap(inject: any = {}) {
  return new Schema({
    ...getCommonInitSchema(),
    'x-component': 'EmploymentCreditMng',
    ...inject,
    'x-decorator-props': {
      disOffsetHeaderSize: true,
      padding: [0, 0, 0, 0],
      w: 3,
      h: 3,
      ...inject?.['x-decorator-props'],
      // padding: 0
    },
  })
}
