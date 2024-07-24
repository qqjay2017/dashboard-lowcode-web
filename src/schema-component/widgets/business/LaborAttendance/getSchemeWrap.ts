import { Schema } from '@formily/react'
import { getCommonInitSchema } from '@/schema-component'

export function getSchemeWrap(inject: any = {}) {
  return new Schema({
    ...getCommonInitSchema(),
    'x-component': 'LaborAttendance',
    ...inject,
    'x-decorator-props': {
      padding: [0, 0, 0, 0],
      w: 3,
      h: 3,
      ...inject?.['x-decorator-props'],
      // padding: 0
    },
  })
}
