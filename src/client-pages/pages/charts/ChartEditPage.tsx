import { useParams } from "react-router-dom";

import { css } from "@emotion/css";
import React, { useEffect, useRef, useState } from "react";
import { Select, Spin, Switch, message } from "antd";

import { defaultChartTemplate } from "./consts";

import { ChartEditRight } from "./ChartEditRight";

import { useEditChartApi } from "./useEditChartApi";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";
import { useApp } from "@/application/hooks";

import { htmlImgUtil } from "@/utils/htmlImgUtil";

import MonacoEditor from "@/schema-component/components/MonacoEditor";
import { defaultMessage } from "@/utils/defaultMessage";

import {
  functionTemplateHandle,
  useGetChartOption,
} from "@/schema-component/widgets";

function ChartEditPage() {
  const app = useApp();
  const editChartApi = useEditChartApi();
  const apiClient = useAPIClient();
  const { id } = useParams();
  const [spinning, setSpinning] = useState(false);
  const [busDataMock, setBusDataMock] = useState("{}");

  const [themeProvider, setThemeName] = useState("technologyBlue");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [content, setTemplate] = useState("");
  const [chartOption, setChartOption] = useState(null);
  const getChartOption = useGetChartOption({
    isDarkTheme,
    themeProvider,
  });

  const handleCompileTemplate = (content = "", _busDataMock?: any) => {
    if (!content) {
      app.message.warning("图表模版内容为空,请输入");
      return false;
    }
    try {
      const busData = functionTemplateHandle(_busDataMock ?? busDataMock, {});
      console.log(busData, "_busDataMock");
      const c = getChartOption(content, busData);
      setChartOption(c);
      app.message.success("代码执行成功");

      return content;
    } catch (error) {
      console.error(error);
      setSpinning(false);
      app.message.error("代码执行失败");
    }
  };
  async function save(newTemp) {
    try {
      const imgSrc = await htmlImgUtil({
        element: "ChartViewCore",
      });

      await editChartApi({
        isCreate: false,
        chartId: id,
        values: {
          id,
          coverThumbnail: imgSrc?.fileSrcUrl || undefined,
          content: newTemp,
          busDataMock,
        },
      });

      setSpinning(false);
      message.success(defaultMessage.submit);
    } catch (error) {
      console.error(error, "error");
      setSpinning(false);
    }
  }
  const handleSaveTemplate = async (temp) => {
    try {
      const newTemp = await handleCompileTemplate(temp);
      if (!newTemp) {
        setSpinning(false);
        return false;
      }

      setSpinning(true);
      setTimeout(async () => {
        try {
          save(newTemp);
        } catch (error) {
          setSpinning(false);
        }
      }, 1500);
    } catch (error) {
      console.error(error, "handleSaveTemplate");
      setSpinning(false);
    }
  };

  useEffect(() => {
    apiClient
      .request({
        url: `${apiBase}/chart/${id}`,
      })
      .then((res) => {
        const chartDt = res || {};
        // const type = chartDt.type;
        setBusDataMock(chartDt.busDataMock);
        // const isPie = type === "pie";
        // if (isPie) {
        //   setChartMockDataType("pieData");
        // }

        const content = chartDt.content || defaultChartTemplate;
        setTemplate(content);
        handleCompileTemplate(content, chartDt.busDataMock);
      });
  }, [id]);

  return (
    <div
      className={css`
        width: 100vw;
        height: calc(100vh - 50px);
        display: flex;
      `}
    >
      <Spin spinning={spinning}>
        <div
          className={css`
            min-width: 400px;
            width: calc(100vw - 450px);
            height: 100%;
            border-right: 1px solid #dcdfe6;
          `}
        >
          <div
            className={css`
              width: 100%;
              height: 40px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              display: flex;
              align-items: center;
              justify-content: flex-end;
              column-gap: 12px;
              padding-right: 16px;

              border-bottom: 1px solid #dcdfe6;
            `}
          >
            <Select
              size="small"
              value={themeProvider}
              defaultValue="technologyBlue"
              className={css`
                width: 150px;
              `}
              options={[
                {
                  label: "科技蓝",
                  value: "technologyBlue",
                },
                {
                  label: "复古绿",
                  value: "green",
                },
              ]}
              onChange={(e) => {
                setThemeName(e);
              }}
            />
            <Switch
              checkedChildren="深色"
              unCheckedChildren="浅色"
              checked={isDarkTheme}
              onChange={(e) => {
                setIsDarkTheme(e);
              }}
            ></Switch>

            <RunBtn
              onClick={() => {
                handleSaveTemplate(content);
              }}
            >
              保存
            </RunBtn>
            <RunBtn
              onClick={() => {
                handleCompileTemplate(content);
              }}
            >
              运行
            </RunBtn>
          </div>
          <div
            className={css`
              width: 100%;
              height: calc(100vh - 90px);
            `}
          >
            <MonacoEditor
              // language="handlebars"
              language="javascript"
              value={content}
              onChange={setTemplate}
              height="100%"
              wordWrap="on"
            />
          </div>
        </div>
      </Spin>

      <ChartEditRight
        chartOption={chartOption}
        busDataMock={busDataMock}
        setBusDataMock={setBusDataMock}
        isDarkTheme={isDarkTheme}
        themeProvider={themeProvider}
      />
    </div>
  );
}

function RunBtn({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={css`
        color: #fff;
        background-color: #409eff;
        min-width: 70px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        ${props.className}
      `}
    >
      {children}
    </div>
  );
}

export default ChartEditPage;
