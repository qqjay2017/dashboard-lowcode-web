import type { CustomToken } from "@/dashboard-themes/global-theme";

export function getXAxisCategoryConfig(
  {
    isDarkTheme = true,
    token,
  }: {
    isDarkTheme?: boolean;
    token?: CustomToken;
  } = { isDarkTheme: true }
): any {
  return {
    axisLabel: {
      color: token?.textCommon,
      opacity: 0.7,
    },

    axisLine: {
      lineStyle: {
        color: isDarkTheme ? "#BBC7D0" : "#000",
        opacity: isDarkTheme ? 0.41 : 1,
        type: "solid",
      },
    },
    axisTick: {
      show: false,
    },
  };
}
