import { css } from "@emotion/css";

import { get } from "lodash-es";
import type { WagonBalanceRow } from "./types";
import StatisticsItem from "./StatisticsItem";
import WeightImg from "./WeightImg";
import {
  Dialog,
  DialogContent,
  DialogContentInner,
  DialogContentItem,
  DialogHeader,
  DialogTitle,
  FullScreenDialogContent,
  OneTable,
  OneTableBody,
  OneTableCell,
  OneTableContainer,
  OneTableHead,
  OneTableHeader,
  OneTableRow,
} from "@/dashboard-themes/ui";
import { useRequest } from "@/api-client";
import {
  apiConfig,
  safeObjectSelect,
  systemIds,
} from "@/schema-component/shared";
import { EmptyKit } from "@/dashboard-themes/style-components";

export default function WeighbridgeDtDialog({
  dialogOpen,
  setDialogOpen,
  id,
  isPc,
}: {
  id?: string;
  dialogOpen?: boolean;
  isPc?: boolean;
  setDialogOpen?: (flag?: boolean) => void;
}) {
  const Content = isPc ? DialogContent : FullScreenDialogContent;
  const { data, isLoading } = useRequest<WagonBalanceRow>(
    `${apiConfig.apiIot}/v1/iot/wagon-balance/${id}`,
    {
      method: "GET",
      refreshDeps: [id],
      enabled: !!id,

      select: safeObjectSelect,
      headers: {
        "system-id": systemIds.zhgd,
      },
    }
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Content
        className={
          isPc
            ? css`
                width: 1200px;
                height: 859px;
              `
            : css`
                padding-bottom: 0.44rem;
              `
        }
      >
        <DialogHeader>
          <DialogTitle>设备信息</DialogTitle>
        </DialogHeader>
        <DialogContentInner>
          <EmptyKit loading={isLoading || !data} empty={!data}>
            <div
              className={css`
                padding: 0 0.24rem;
              `}
            >
              <DialogContentItem header="基本信息">
                <div
                  className={css`
                    display: grid;
                    grid-template-columns: repeat(${isPc ? 4 : 1}, 1fr);
                    row-gap: 0.16rem;
                  `}
                >
                  <StatisticsItem label="送货单单号" value={data.deliveryNo} />
                  <StatisticsItem label="车牌号码" value={data.carNo} />
                  <StatisticsItem
                    label="发货单位"
                    value={data.goodsDevCompany}
                  />
                  <StatisticsItem label="过磅员姓名" value={data.weighMan} />
                </div>
              </DialogContentItem>
              <DialogContentItem header="材料信息">
                <div
                  className={css`
                    display: grid;
                    grid-template-columns: repeat(${isPc ? 4 : 1}, 1fr);
                    row-gap: 0.16rem;
                  `}
                >
                  <StatisticsItem label="货物名称" value={data.goodsName} />
                  <StatisticsItem label="货物规格" value={data.goodsSpec} />
                  <StatisticsItem
                    label="送货单重量"
                    value={data.deliveryActualWeight}
                    unit="吨"
                  />
                </div>
              </DialogContentItem>
              <DialogContentItem header="过磅信息">
                <OneTableContainer>
                  <OneTable
                    className={css`
                      min-width: ${isPc ? "100%" : "1190px;"};
                    `}
                  >
                    <OneTableHeader>
                      <OneTableRow>
                        {[
                          "毛重",
                          "皮重",
                          "净重",
                          "扣量",
                          "实量",
                          "重量偏差",
                          "偏差比例",
                        ].map((h) => {
                          return <OneTableHead key={h}>{h}</OneTableHead>;
                        })}
                      </OneTableRow>
                    </OneTableHeader>
                    <OneTableBody>
                      <OneTableRow>
                        {[
                          `${data.grossWeight || 0}吨`,
                          `${data.tare || 0}吨`,
                          `${data.netWeight || 0}吨`,
                          `${data.deductWeight || 0}吨`,
                          `${data.trueWeight || 0}吨`,
                          `${data.weightDeviation || 0}吨`,
                          `${data.deviationRatio || 0}%`,
                        ].map((row) => {
                          return <OneTableCell key={row}>{row}</OneTableCell>;
                        })}
                      </OneTableRow>
                    </OneTableBody>
                  </OneTable>
                </OneTableContainer>
              </DialogContentItem>
              <DialogContentItem header="过磅照片">
                <div
                  className={css`
                    display: grid;
                    grid-template-columns: repeat(${isPc ? 3 : 1}, 1fr);
                    column-gap: 0.24rem;
                    row-gap: 0.16rem;
                  `}
                >
                  <WeightImg type="车牌照片" imgSrc={data.carNumberImg} />
                  <WeightImg
                    type="毛重照片"
                    imgSrc={get(data, "grossWeightImgList[0]")}
                    time={data.grossWeightTime}
                  />
                  <WeightImg
                    type="皮重照片"
                    imgSrc={get(data, "tareImgList[0]")}
                    time={data.tareTime}
                  />
                </div>
              </DialogContentItem>
            </div>
          </EmptyKit>
        </DialogContentInner>
      </Content>
    </Dialog>
  );
}
