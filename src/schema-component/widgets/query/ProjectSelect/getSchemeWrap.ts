import { Schema } from '@formily/react'
import { getCommonInitSchema } from '@/schema-component/core'

export function getSchemeWrap(inject: any = {}) {
    return new Schema({
        ...getCommonInitSchema(),
        'type': 'object',
        'name': 'projectSelect',
        'x-component': 'ProjectSelect',

        ...inject,
        'x-decorator-props': {
            padding: [0, 0, 0, 0],
            w: 2,
            h: 0.55,
            ...inject?.['x-decorator-props'],
            // padding: 0
        },
        'x-reactions': ['{{useAsyncProjectDataSource(projectList,firstProject)}}'],


    })
}


