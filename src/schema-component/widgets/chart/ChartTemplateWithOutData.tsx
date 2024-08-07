import ReactECharts from "echarts-for-react";
import { get } from "lodash-es";
import { useChartOption, useFetchChartConfig } from "./hooks";

import { useToken } from "@/schema-component/antd/style";

import type { SchemComponentWithDataSourceProps } from "@/types";
import { EmptyKit } from "@/dashboard-themes/style-components";

import { getEChartsReactTheme } from "@/utils/chartCommonOption/theme";

interface ChartTemplateWithOutDataProps
  extends SchemComponentWithDataSourceProps {
  chartId?: string;
  loading?: boolean;
  empty?: boolean;
  busData?: any;
}

export function ChartTemplateWithOutData(props: ChartTemplateWithOutDataProps) {
  const {
    chartId,
    loading,
    empty,

    busData = {},
  } = props;

  const { token } = useToken();
  const { data: chartDataRes, isLoading: isChartDataLoading } =
    useFetchChartConfig(chartId);
  const chartDataTemplate = get(chartDataRes, "content");

  const optionMemo = useChartOption(chartDataTemplate, busData);

  return (
    <EmptyKit
      loading={isChartDataLoading || loading}
      empty={!chartDataTemplate || empty}
    >
      <ReactECharts
        theme={getEChartsReactTheme({ isDarkTheme: token.isDarkTheme })}
        style={{
          width: "100%",
          height: "100%",
        }}
        option={optionMemo || {}}
      />
    </EmptyKit>
  );
}
