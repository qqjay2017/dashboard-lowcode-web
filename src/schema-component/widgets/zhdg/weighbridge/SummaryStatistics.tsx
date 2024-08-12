import { css } from "@emotion/css";
import type { StatisticsItemProps } from "./StatisticsItem";
import StatisticsItem from "./StatisticsItem";
import {
  useDashboardRoot,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import { cx } from "@/utils";
import { useRequest } from "@/api-client";
import type { FormItemComponentProps } from "@/types";
import { apiConfig, apiUrlMap, systemIds } from "@/schema-component/shared";

const askIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAjJJREFUWEfNl89V20AQxr9ZWSI58J7pwFQQ6MCuIKECcAcYwSGnwCkHYkwHqIOYCuwOIBVEHcANLGENb1cICcmSd2XFjq7a2fnNN380Imz4oQ37hxnAObexPTsCWl9AvAdwOw6AfDAeAb5FYE/xnXzdwPQALsMuLPwAc1frYqIp5rjAmT1ddr4aQEX8cgPwt2UXLX4vPATWRZUi5QA/nzpwrAmATj3n71Y+ArtXBrEYoDnnCUUpRBGgeecphLD3MaDHrKJFgF8zD0SHK8peYk5juPZBOYCsdsEy7xqPbDnnWB10gmuAvmoYARH1st3xUYGrcKLdahAe3FZfOTVRTbboid1LYFOAOPd/taKIh88YQWtgrIA0EPZOUgspwDA4AnCjD7DCySga4OzTtQrj/ZrhbKydxxV8x6Zp+lIAo/wrdB8s4lFLURdsMLAI9zhx9nMKBDL/BlOvZhHGEvhwnd3/DOAquANjTz+9KyjANMVp3IppDZj0cq6QjOaAsuVbuFvqC5sCXD4fQ4jRWhQA+nAd7yPAiNuIwoe1AIj5Lgaf1da0/lGcyX8RwOhjVHMUV36MJNIw/F1/BVuWwEznvB0t7gOyFjiULWkwlJY5fpucNO8luU8sFq9ko6cO2Jo0BiHH9gLnxRrIBtIURIXzagD5VkLMxXn9FY3GEK1+fg/Mxvlvfkxkq3ETPyb52pKKRFZX7Q2ENpjjQpW/ZSTugZc/EFteVcT5K/UU0Cjyukc2DvAKPAroISzv/nkAAAAASUVORK5CYII=`;

function renderStatisticsItems(statisticsItems: StatisticsItemProps[] = []) {
  return (
    <>
      {statisticsItems.map((item, index) => {
        return <StatisticsItem key={index} {...item} />;
      })}
    </>
  );
}

export default function SummaryStatistics({
  pageNum,
  pageSize,
  searchValues = {},
}: FormItemComponentProps) {
  const busParams = useQueryToBusParams();
  const { isPc } = useDashboardRoot();
  const { data } = useRequest(
    `${apiConfig.apiIot}${apiUrlMap.wagonBalanceSummary}`,
    {
      data: {
        ...busParams,
        ...searchValues,
        pageSize,
        pageNum,
      },
      refreshDeps: [busParams, searchValues, pageSize, pageNum],
      method: "POST",
      headers: {
        "system-id": systemIds.zhgd,
      },
    }
  );
  if (!data) {
    return null;
  }

  const statisticsItems: StatisticsItemProps[] = [
    {
      label: "送货单重量",
      value: data.deliveryActualWeight || 0,
      unit: "吨",
    },
    {
      label: "扣量",
      value: data.deductWeight || 0,
      unit: "吨",
    },
    {
      label: "重量偏差",
      value: data.weightDeviation || 0,
      unit: "吨",
      color: data.weightDeviation < 0 ? "#FE9292" : undefined,
    },
    {
      label: "净重",
      value: data.netWeight || 0,
      unit: "吨",
    },
    {
      label: "实际重量",
      value: data.trueWeight || 0,
      unit: "吨",
    },
    {
      label: "过磅车次",
      value: data.count,
      unit: "吨",
    },
  ];

  if (!isPc) {
    return <SummaryStatisticsMobile statisticsItems={statisticsItems} />;
  }
  return (
    <div
      className={css`
        width: 100%;
        height: 0.92rem;
        background: rgba(0, 141, 250, 0.15);
        padding: 0.16rem 0.2rem;
        display: flex;
      `}
    >
      <div
        className={css`
          width: 1.2rem;
          line-height: 0.16rem;

          margin-top: ${isPc ? "8px" : "2px"};
        `}
      >
        <HzImg />
      </div>
      <div
        className={css`
          width: calc(100% - 1.2rem);
          height: 100%;
          display: grid;
          grid-template-columns: ${isPc ? " 1fr 1fr 1fr" : " 1fr  1fr"};
          grid-template-rows: ${isPc ? "1fr 1fr" : "1fr 1fr 1fr"};
        `}
      >
        {renderStatisticsItems(statisticsItems)}
      </div>
    </div>
  );
}

function SummaryStatisticsMobile({
  statisticsItems = [],
}: {
  statisticsItems: StatisticsItemProps[];
}) {
  const statisticsItemWrapStyle = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 0.24rem;
  `;
  return (
    <div
      className={css`
        width: 100%;
        height: 3.11rem;
        background: rgba(0, 141, 250, 0.15);
        padding: 0.16rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <HzImg
        className={css`
          margin-bottom: 0.32rem;
        `}
      />
      <div
        className={cx(
          statisticsItemWrapStyle,
          css`
            margin-bottom: 0.4rem;
          `
        )}
      >
        {renderStatisticsItems([
          statisticsItems[0],
          statisticsItems[1],
          statisticsItems[2],
        ])}
      </div>
      <div className={cx(statisticsItemWrapStyle)}>
        {renderStatisticsItems([
          statisticsItems[3],
          statisticsItems[4],
          statisticsItems[5],
        ])}
      </div>
    </div>
  );
}

function HzImg({ className }: { className?: string }) {
  const { isPc } = useDashboardRoot();
  return (
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
        `,
        className
      )}
    >
      <img
        src={askIcon}
        alt=""
        className={css`
          width: ${isPc ? "0.16rem" : "0.24rem"};
          height: ${isPc ? "0.16rem" : "0.24rem"};

          margin-right: 0.08rem;
        `}
      />
      <span
        className={css`
          font-size: ${isPc ? "0.14rem" : "0.28rem"};
          color: #ffffff;
          line-height: ${isPc ? "0.16rem" : "0.33rem"};
        `}
      >
        汇总统计
      </span>
    </div>
  );
}
