import React from "react";
import { css } from "@emotion/css";
import type { WagonBalanceRow } from "./types";
import { EmptyKit } from "@/dashboard-themes/style-components";
import { timeFormat } from "@/utils/format";
import { useDashboardRoot } from "@/schema-component/hooks";

export default function WeightImg({
  imgSrc = "",
  type = "车牌照片",
  time,
}: {
  imgSrc?: string;
  type?: string;
  time?: number;
}) {
  const { isPc } = useDashboardRoot();
  return (
    <div>
      <EmptyKit
        empty={!imgSrc}
        className={css`
          height: 207px;
        `}
      >
        <img
          src={imgSrc}
          className={css`
            width: 368px;
            height: 207px;
            object-fit: contain;
          `}
        />
      </EmptyKit>
      <div
        className={css`
          margin: 0.08rem 0;

          font-weight: 400;
          font-size: ${isPc ? " 0.14rem" : " 0.28rem"};
          color: rgba(202, 208, 224, 0.7);
          line-height: ${isPc ? " 0.22rem" : " 0.32rem"};

          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div>{type}</div>
        {time && <div>{timeFormat(time)}</div>}
      </div>
    </div>
  );
}
