import ReactECharts from "echarts-for-react";

import { get } from "lodash-es";

import type { ChartTemplateProps } from "./types";
import { useFetchChartConfig } from "./hooks/useFetchChartConfig";
import { useChartOption } from "./hooks";

import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import { useToken } from "@/schema-component/antd/style";

import { EmptyKit } from "@/dashboard-themes/style-components";

import { getEChartsReactTheme } from "@/utils/chartCommonOption/theme";

export function ChartTemplateWithDataSource({
  chartId,
  apiInfo,
  queryKeys,
}: ChartTemplateProps) {
  const { token } = useToken();
  const { data: chartDataRes, isLoading: isChartDataLoading } =
    useFetchChartConfig(chartId);
  const chartDataTemplate = get(chartDataRes, "data.data.template");
  const queryParams = useQueryToBusParams(queryKeys);
  const { data: busDataRes, isLoading: isBusDataLoading } = useDataBindFetch(
    apiInfo,
    queryParams
  );
  const busData = get(busDataRes, "data.data");

  const optionMemo = useChartOption(chartDataTemplate, busData);

  return (
    <EmptyKit
      loading={isChartDataLoading || isBusDataLoading}
      empty={!chartDataTemplate || !busData}
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
