import { memo, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import Handlebars from "handlebars";
import { get } from "lodash-es";
import * as echarts from "echarts";
import Decimal from "decimal.js";
import { getSchemeWrap } from "./getSchemeWrap";
import { settingSchema } from "./settingSchema";
import { EmptyKit } from "@/style-components";
import { useRequest } from "@/api-client";
import {
  apiBase,
  chartListDataFormat,
  findItemByName,
  getTotalNum,
} from "@/utils";

import { useDataBindFetch, useQueryToBusParams } from "@/schema-component";
import { useToken } from "@/style";
import chartDarkTheme from "@/global-theme/chart-theme/dark";
import chartLightTheme from "@/global-theme/chart-theme/light";
import { getPercent } from "@/schema-component/utils";
import type { SchemComponentWithDataSourceProps } from "@/types";

interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string;
}

export const ChartTemplate = memo(
  ({ chartId, dataSource, query }: ChartTemplateProps) => {
    const { token } = useToken();
    const { data: chartDataRes, isLoading: isChartDataLoading } = useRequest(
      `${apiBase}/chart/${chartId}`,
      {
        method: "GET",
        refreshDeps: [chartId],
        enabled: !!chartId,
      },
    );
    const chartDataTemplate = get(chartDataRes, "data.data.template");
    const queryParams = useQueryToBusParams(query);
    const { data: busDataRes, isLoading: isBusDataLoading } = useDataBindFetch(
      dataSource,
      queryParams,
    );
    const busData = get(busDataRes, "data.data");
    const optionMemo = useMemo(() => {
      if (dataSource?.dataSourceId && !busData) {
        return {};
      }
      if (!chartDataTemplate) {
        return {};
      }
      try {
        const handlebarsTemplate = Handlebars.compile(chartDataTemplate);
        //   const chartListData = chartMockData[chartMockDataType] || [];
        let { chartListData, totalNum } = chartListDataFormat(
          busData?.chartListData || busData,
        );
        if (!Array.isArray(chartListData)) {
          chartListData = [];
        }
        const handlebarsStr = handlebarsTemplate({
          chartListData,
        });
        // eslint-disable-next-line no-new-func
        const funCode = new Function(
          "echarts",
          "chartListData",
          "token",
          "busData",
          "chartHelps",
          `option=null;${handlebarsStr};return option||{}`,
        );
        const c =
          funCode(echarts, chartListData, token, busData, {
            Decimal,
            get,
            getTotalNum,
            findItemByName,
            getPercent,
            chartListDataFormat,
            totalNum,
          }) || {};
        return c;
      } catch (error) {
        return {};
      }
    }, [chartDataTemplate, busData, dataSource?.dataSourceId]);

    return (
      <EmptyKit
        loading={isChartDataLoading || isBusDataLoading}
        empty={!chartDataTemplate || !busData}
      >
        <ReactECharts
          theme={token.isDarkTheme ? chartDarkTheme : chartLightTheme}
          style={{
            width: "100%",
            height: "100%",
          }}
          option={optionMemo || {}}
        />
      </EmptyKit>
    );
  },
);

// @ts-expect-error
ChartTemplate.schemaFn = getSchemeWrap;
// @ts-expect-error
ChartTemplate.settingSchema = settingSchema;
