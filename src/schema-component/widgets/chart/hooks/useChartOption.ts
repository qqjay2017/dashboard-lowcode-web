import { useMemo } from "react";
import { get } from "lodash-es";
import Handlebars from "handlebars";
import * as echarts from "echarts";
import Decimal from "decimal.js";
import {
  chartListDataFormat,
  findItemByName,
  getTotalNum,
  percentToDisplay,
} from "@/utils";
import { useToken } from "@/schema-component/antd/style";
import { getPercent } from "@/schema-component/utils";

export function useChartOption(chartDataTemplate = "", busData) {
  const { token } = useToken();
  return useMemo(() => {
    if (!chartDataTemplate || !busData) {
      return {};
    }
    try {
      const handlebarsTemplate = Handlebars.compile(chartDataTemplate);
      //   const chartListData = chartMockData[chartMockDataType] || [];
      let { chartListData, totalNum } = chartListDataFormat(
        busData?.chartListData || busData
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
        `option=null;${handlebarsStr};return option||{}`
      );
      const c =
        funCode(echarts, chartListData, token, busData, {
          Decimal,
          get,
          getTotalNum,
          findItemByName,
          percentToDisplay,
          getPercent,
          chartListDataFormat,
          totalNum,
        }) || {};
      return c;
    } catch (error) {
      console.log("编译错误", error);
      return {};
    }
  }, [chartDataTemplate, busData, token]);
}
