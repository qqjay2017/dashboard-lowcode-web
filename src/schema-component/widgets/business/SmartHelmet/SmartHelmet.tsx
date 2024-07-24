import React from 'react'
import { get } from 'lodash-es'
import { css } from '@emotion/css'
import { getSchemeWrap } from './getSchemeWrap'
import { menuItem } from './menuItem'
import { settingSchema } from './settingSchema'
import { HelmetLeft } from './HelmetLeft'
import { HelmetRight } from './HelmetRight'
import type { ApplicationAnalysiItem, SafetyProjectType } from './types'
import {
  useDataBindFetch,
  useQueryToBusParams,
} from '@/schema-component/hooks'
import type { SchemComponentWithDataSourceProps } from '@/types'

export function SmartHelmet({
  query,
  dataSource,
}: SchemComponentWithDataSourceProps) {
  const busParams = useQueryToBusParams(query)
  const { data: dataRes } = useDataBindFetch(dataSource, query)
  const safetyProject: SafetyProjectType = get(
    dataRes,
    'data.data.safetyProject',
    {},
  )
  const applicationAnalysis: ApplicationAnalysiItem[]
    = get(dataRes, 'data.data.applicationAnalysis', []) || []

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      <HelmetLeft safetyProject={safetyProject} />
      <HelmetRight applicationAnalysis={applicationAnalysis} />
    </div>
  )
}

SmartHelmet.displayName = 'SmartHelmet'
SmartHelmet.schemaFn = getSchemeWrap
SmartHelmet.menuItem = menuItem
SmartHelmet.settingSchema = settingSchema
