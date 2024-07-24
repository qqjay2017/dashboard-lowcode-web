import { memo } from 'react'

import { getSchemeWrap } from './getSchemeWrap'
import { settingSchema } from './settingSchema'
import { ChartTemplateWithDataSource } from './ChartTemplateWithDataSource'
import { ChartTemplateWithOutData } from './ChartTemplateWithOutData'

import type { SchemComponentWithDataSourceProps } from '@/types'

interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string
}

export const ChartTemplate = memo((props: ChartTemplateProps) => {
  const { dataSource } = props
  if (dataSource && dataSource.dataSourceId) {
    return <ChartTemplateWithDataSource {...props} />
  }
  else {
    <ChartTemplateWithOutData {...props} />
  }
})

// @ts-expect-error
ChartTemplate.schemaFn = getSchemeWrap
// @ts-expect-error
ChartTemplate.settingSchema = settingSchema
