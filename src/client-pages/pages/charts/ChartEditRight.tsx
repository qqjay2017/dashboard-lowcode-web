import { css } from "@emotion/css";
import React from "react";
import { ConfigProvider, Select } from "antd";

import { ChartView } from "./ChartView";

import { chartMockData, chartMockDataOptions } from "./chartMockData";
import { useCustomThemeToken } from "@/dashboard-themes";
import { useApp } from "@/application/hooks";
import { ThemeCSSVariableProvider } from "@/dashboard-themes/css-variable";
import MonacoEditor from "@/schema-component/components/MonacoEditor";

function ChartEditRightMain({
  themeProvider,
  isDarkTheme,

  chartOption,
}) {
  return (
    <div
      className={css`
        width: 450px;
        height: 288px;
        border-bottom: 1px solid #dcdfe6;
      `}
    >
      {/* 预览 */}
      <ChartView
        option={chartOption}
        themeProvider={themeProvider}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
}

export function ChartEditRight(props) {
  const { isDarkTheme, themeProvider } = props;
  const customThemeToken = useCustomThemeToken({
    isDarkTheme,
    themeProvider,
  });
  return (
    <div
      className={css`
        width: 450px;
        height: 100%;
      `}
    >
      <ConfigProvider
        theme={{
          ...customThemeToken,
        }}
      >
        <ThemeCSSVariableProvider>
          <ChartEditRightMain {...props} />
        </ThemeCSSVariableProvider>
      </ConfigProvider>
      <ChartEditRightBusDataMock {...props} />
    </div>
  );
}

export function ChartEditRightBusDataMock({ busDataMock, setBusDataMock }) {
  return (
    <>
      <div
        className={css`
          width: 100%;
          height: 40px;
          padding: 0 16px;
          display: flex;
          align-items: center;
        `}
      >
        <Select
          size="small"
          className={css`
            width: 150px;
          `}
          value="预设数据"
          placeholder="预设数据"
          options={chartMockDataOptions}
          onChange={(e) => {
            const d = chartMockData[e];
            setBusDataMock(`option = ${JSON.stringify(d)}`);
            // setChartMockDataType(e);
          }}
        />
      </div>
      <div
        className={css`
          width: 100%;
          height: calc(100% - 328px);
        `}
      >
        {/*  模拟数据 */}
        <MonacoEditor
          language="javascript"
          value={busDataMock}
          onChange={setBusDataMock}
          height="100%"
        />
      </div>
    </>
  );
}
