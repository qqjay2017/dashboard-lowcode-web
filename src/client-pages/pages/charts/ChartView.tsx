import { css } from "@emotion/css";

import ReactECharts from "echarts-for-react";

import { ErrorBoundary } from "react-error-boundary";

import { cn, cx } from "@/utils";
import { useClassicFrameStyle } from "@/schema-component/widgets/frame/classic-frame/styles";
import { AppError } from "@/application/components/defaultAppError";
import { useApp } from "@/application/hooks";

import { useDashboardRootStyle } from "@/schema-component/hooks";
import { getEChartsReactTheme } from "@/utils/chartCommonOption/theme";

interface IChartViewCoreProps {
  option?: any;
  themeProvider?: string;
  isDarkTheme?: boolean;
}
function ChartViewCore({
  option = {},
  isDarkTheme,
  themeProvider,
}: IChartViewCoreProps) {
  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
    showBg: true,
  });
  const classicFrameStyle = useClassicFrameStyle({ hasTitle: false });

  return (
    <div
      id="ChartViewCore"
      className={cx(
        rootStyle.styles,
        css`
          width: 100%;
          height: 100%;
          background-position: center center;
        `,
        themeProvider
      )}
    >
      <div className={cn("nodeContentRenderer", classicFrameStyle.styles)}>
        <ReactECharts
          key={JSON.stringify(option)}
          theme={getEChartsReactTheme({ isDarkTheme })}
          style={{
            width: "100%",
            height: "100%",
          }}
          option={option || {}}
        />
      </div>
    </div>
  );
}

export function ChartView(props: IChartViewCoreProps) {
  const app = useApp();
  return (
    <ErrorBoundary
      FallbackComponent={(props) => <AppError app={app} {...props} />}
    >
      <ChartViewCore {...props} />
    </ErrorBoundary>
  );
}
