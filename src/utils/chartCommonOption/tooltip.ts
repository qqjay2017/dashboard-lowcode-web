import type { EChartsOption } from "echarts";

export function getCommonTooltipOption(
  {
    isDarkTheme = true,
  }: {
    isDarkTheme?: boolean;
  } = { isDarkTheme: true }
): any {
  if (isDarkTheme) {
    return {
      confine: true,
      borderWidth: 0,
      backgroundColor: "rgba(0, 0, 0, 0.50)", // 设置背景图片 rgba格式
      textStyle: {
        align: "left",
        color: "rgba(255, 255, 255, 1)", // 设置文字颜色
      },
      trigger: "item",
      axisPointer: {
        type: "none",
      },
      formatter: getTooltipWithPercentFormatter(),
    };
  } else {
    return {
      confine: true,
      borderWidth: 0,
      trigger: "item",
      axisPointer: {
        type: "none",
      },
      formatter: getTooltipWithPercentFormatter(),
    };
  }
}

export function getTooltipWithPercentFormatter() {
  // return "{a} <br/>{b} : {c} ({d}%)";
  return ({ percent, name, value, seriesName, marker }: any) => {
    if (!name) {
      return "";
    }
    // return "{a} <br/>{b} : {c} ({d}%)";
    return `
     ${seriesName}<br />
     ${marker} ${name} : ${value}\n (${percent}%)`;
  };
}

export function getBarLineTooltipOption(
  {
    isDarkTheme = true,
  }: {
    isDarkTheme?: boolean;
  } = { isDarkTheme: true }
): any {
  return {
    ...getCommonTooltipOption({ isDarkTheme }),
    formatter: "",
  };
}
