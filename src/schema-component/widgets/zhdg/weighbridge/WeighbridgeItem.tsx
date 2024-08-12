import { css } from "@emotion/css";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
import Decimal from "decimal.js";
import type { HTMLAttributes } from "react";
import StatisticsItem from "./StatisticsItem";

import WeighbridgeItemTag from "./WeighbridgeItemPropsTag";
import type { WagonBalanceRow } from "./types";
import { alignCenterStyle, cx, flex1Style } from "@/utils";
import { useDashboardRoot } from "@/schema-component/hooks";
import { timeFormat } from "@/utils/format";

export interface WeighbridgeItemProps {
  date?: string;
}

const lineItemStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  height: 50%;
  justify-content: space-between;
`;

export default function WeighbridgeItem(props: {
  date?: string;
  row?: Partial<WagonBalanceRow>;
  handleOpenWeighbridgeDtDialog?: Function;
}) {
  const { isPc } = useDashboardRoot();
  const { row = {}, handleOpenWeighbridgeDtDialog } = props;
  if (!isPc) {
    return <WeighbridgeItemMobile {...props} />;
  }
  return (
    <div
      className={css`
        width: 100%;
        height: 0.92rem;
        margin: 0.16rem 0;
        padding: 0.16rem 0.24rem;

        background: rgba(18, 35, 62, 0.8);
        border: 1px solid #30425e;
      `}
    >
      <div className={cx(lineItemStyle)}>
        <div
          className={css`
            font-weight: 600;
            font-size: 0.16rem;
            color: #ffffff;
            line-height: 0.2rem;
            flex: 1;
            display: flex;
            align-items: center;
          `}
        >
          {row.goodsName}
          <WeighbridgeItemTag weightFlag={row.weightFlag} />
        </div>
        <div
          className={css`
            margin-right: 0.48rem;
          `}
        >
          {timeFormat(row.reportTime)}
        </div>
        <div
          className={css`
            margin-right: 0.48rem;
          `}
        >
          {row.goodsDevCompany}
        </div>
        <div>{row.carNo}</div>
      </div>
      <div className={cx(lineItemStyle)}>
        <StatisticsItem label="规格型号" value={row.goodsSpec || ""} />
        <StatisticsItem
          label="送货单重量"
          value={row.deliveryActualWeight || 0}
          unit="吨"
        />
        <StatisticsItem
          label="实际重量"
          value={row.trueWeight || 0}
          unit="吨"
        />
        <StatisticsItem
          label="重量偏差"
          value={row.weightDeviation || 0}
          unit="吨"
          color={
            new Decimal(row.weightDeviation || 0).lessThan(0)
              ? "#FE9292"
              : undefined
          }
        />
        <DtBtn
          onClick={() => {
            handleOpenWeighbridgeDtDialog &&
              handleOpenWeighbridgeDtDialog(row.id);
          }}
        />
      </div>
    </div>
  );
}

function WeighbridgeItemMobile(props: { row?: Partial<WagonBalanceRow> }) {
  const { row = {} } = props;
  return (
    <div
      className={css`
        padding: 0.16rem;
        width: 100%;
        height: 2.81rem;
        background: rgba(18, 35, 62, 0.8);
        border: 1px solid #30425e;
        margin: 0.24rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-weight: 400;
        font-size: 0.24rem;
        color: rgba(202, 208, 224, 0.7);
        line-height: 0.28rem;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          className={css`
            font-weight: 600;
            font-size: 0.32rem;
            color: #ffffff;
            line-height: 0.38rem;
            display: flex;
            align-items: center;
          `}
        >
          {row.goodsName}
          <WeighbridgeItemTag
            weightFlag={row.weightFlag}
            className={css`
              width: 0.64rem;
              height: 0.28rem;
              margin-left: 0.12rem;
            `}
          />
        </div>
        <DtBtn
          className={css`
            font-size: 0.24rem;
          `}
        />
      </div>
      <div className={css``}> {timeFormat(row.reportTime)}</div>
      <div
        className={css`
          display: flex;
          margin-bottom: 0.08rem;
        `}
      >
        <div
          className={css`
            margin-right: 0.48rem;
          `}
        >
          {timeFormat(row.reportTime)}
        </div>
        <div>{row.carNo}</div>
      </div>
      <div className={cx(alignCenterStyle)}>
        <StatisticsItem
          className={flex1Style}
          label="规格型号"
          value={row.goodsSpec || ""}
        />
        <StatisticsItem
          className={flex1Style}
          label="送货单重量"
          value={row.deliveryActualWeight || 0}
          unit="吨"
        />
      </div>
      <div className={cx(alignCenterStyle)}>
        <StatisticsItem
          className={flex1Style}
          label="实际重量"
          value={row.trueWeight || 0}
          unit="吨"
        />
        <StatisticsItem
          className={flex1Style}
          label="重量偏差"
          value={row.weightDeviation || 0}
          unit="吨"
          color={
            new Decimal(row.weightDeviation || 0).lessThan(0)
              ? "#FE9292"
              : undefined
          }
        />
      </div>
    </div>
  );
}

function DtBtn({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cx(
        css`
          color: #008dfa;
          font-size: 0.14rem;
          line-height: 0.16rem;
          display: flex;
          align-items: center;
          cursor: pointer;
        `,
        className
      )}
    >
      查看详情
      <HiMiniChevronDoubleRight
        style={{
          marginLeft: "0.04rem",
        }}
      />
    </div>
  );
}
