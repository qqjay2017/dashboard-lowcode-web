import chartDarkTheme from "@/dashboard-themes/global-theme/chart-theme/dark";
import chartLightTheme from "@/dashboard-themes/global-theme/chart-theme/light";

export function getEChartsReactTheme(
  {
    isDarkTheme = true,
  }: {
    isDarkTheme?: boolean;
  } = { isDarkTheme: true }
) {
  return isDarkTheme ? chartDarkTheme : chartLightTheme;
}
