import type { CustomToken } from "@/dashboard-themes/global-theme";

export function getyYAxisConfig(
  {
    isDarkTheme = true,
    token,
  }: {
    isDarkTheme?: boolean;
    token?: CustomToken;
  } = { isDarkTheme: true }
): any {
  return {
    name: "yname",
    type: "value",
    inverse: false,
    axisTick: {
      show: false,
    },

    axisLabel: {
      color: token?.textCommon,
      opacity: 0.7,
    },
    splitLine: {
      show: false,
    },
  };
}
