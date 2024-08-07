import EChartsReact from "echarts-for-react";
import type { EChartsOption } from "echarts";

import { useToken } from "@/schema-component/antd";
import {
  getBottomCenterLegendConfig,
  getCommonTooltipOption,
  getPieSeriesConfig,
} from "@/utils/chartCommonOption";
import { getEChartsReactTheme } from "@/utils/chartCommonOption/theme";

export default function DeviationOfCargoChart() {
  const { token } = useToken();
  const option: EChartsOption = {
    color: ["#64E3FF", "#F7BA5F", "#F487E2", "#A195EF"],
    tooltip: getCommonTooltipOption({
      isDarkTheme: token.isDarkTheme,
    }),

    legend: {
      ...getBottomCenterLegendConfig({ isDarkTheme: token.isDarkTheme }),

      data: ["超量", "正常", "缺量", "未填报"],
    },
    title: {
      text: "10000",
      subtext: "过磅总车次",
      textStyle: {
        color: "#fff",
        fontSize: 22,
        lineHeight: 22,
        align: "center",
      },
      subtextStyle: {
        fontSize: 14,
        lineHeight: 14,
        color: "#CAD0E0",
      },
      left: "center",
      top: "35%",
    },
    series: [
      {
        ...getPieSeriesConfig(),
        roseType: "radius",
        radius: ["35%", "65%"],
        name: "各货物偏差情况",
        label: {
          show: true,
          position: "inside",
          color: "#fff",
          formatter: ({ percent }) => {
            return `${percent}%`;
          },
        },
        center: ["50%", "45%"],
        itemStyle: {
          borderRadius: 0,
        },
        data: [
          {
            value: 50,
            name: "超量",
          },
          {
            value: 10,
            name: "正常",
          },
          {
            value: 20,
            name: "缺量",
          },

          {
            value: 5,
            name: "未填报",
          },
        ],
      },
    ],
  };
  return (
    <EChartsReact
      theme={getEChartsReactTheme({
        isDarkTheme: token.isDarkTheme,
      })}
      style={{
        width: "100%",
        height: "100%",
      }}
      option={option || {}}
    />
  );
}
