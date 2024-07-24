import ReactECharts from 'echarts-for-react'
import { get } from 'lodash-es'
import { EmptyKit } from '@/style-components'
import { useToken } from '@/style'
import { useChartOption, useFetchChartConfig } from '@/schema-component'
import chartDarkTheme from '@/global-theme/chart-theme/dark'
import chartLightTheme from '@/global-theme/chart-theme/light'
import type { SchemComponentWithDataSourceProps } from '@/types'

interface ChartTemplateWithOutDataProps
  extends SchemComponentWithDataSourceProps {
  chartId?: string
  loading?: boolean
  empty?: boolean
  busData?: any
}

export function ChartTemplateWithOutData({
  chartId,
  loading,
  empty,

  busData,
}: ChartTemplateWithOutDataProps) {
  const { token } = useToken()
  const { data: chartDataRes, isLoading: isChartDataLoading }
    = useFetchChartConfig(chartId)
  const chartDataTemplate = get(chartDataRes, 'data.data.template')
  const optionMemo = useChartOption(chartDataTemplate, busData)
  console.log(optionMemo, 'optionMemo')

  return (
    <EmptyKit
      loading={isChartDataLoading || loading}
      empty={!chartDataTemplate || empty}
    >
      <ReactECharts
        theme={token.isDarkTheme ? chartDarkTheme : chartLightTheme}
        style={{
          width: '100%',
          height: '100%',
        }}
        option={optionMemo || {}}
      />
    </EmptyKit>
  )
}
