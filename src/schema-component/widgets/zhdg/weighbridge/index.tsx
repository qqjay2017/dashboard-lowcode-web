import { css } from "@emotion/css";
import { useState } from "react";
import { Pagination } from "antd";
import CollapsibleForm from "./CollapsibleForm";
import { fields } from "./fields";
import SummaryStatistics from "./SummaryStatistics";
import WeighbridgeItem from "./WeighbridgeItem";
import type { WagonBalanceRow } from "./types";
import WeighbridgeDtDialog from "./WeighbridgeDtDialog";
import {
  useDashboardRoot,
  useFrameSizeStyle,
  usePageParams,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ExportButton,
} from "@/dashboard-themes/ui";
import { EmptyKit } from "@/dashboard-themes/style-components";
import { useAPIClient, useRequest } from "@/api-client";
import { apiConfig, apiUrlMap, systemIds } from "@/schema-component/shared";

export default function Weighbridge() {
  const busParams = useQueryToBusParams();
  const aPIClient = useAPIClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const { pageNum, pageSize, paginationProps } = usePageParams({});
  const [searchValues, setSearchValues] = useState({});
  const { isPc } = useDashboardRoot();
  const [weighbridgeDtId, setWeighbridgeDtId] = useState("");
  const { data: wagonBalanceRes, isLoading } = useRequest(
    `${apiConfig.apiIot}${apiUrlMap.wagonBalanceSearch}`,
    {
      data: {
        ...busParams,
        ...searchValues,
        pageNum,
        pageSize,
      },
      refreshDeps: [pageNum, pageSize, busParams, searchValues],
      method: "POST",
      headers: {
        "system-id": systemIds.zhgd,
      },
    }
  );

  const wagonBalanceTotal = wagonBalanceRes?.total || 0;
  const wagonBalanceRows: WagonBalanceRow[] = wagonBalanceRes?.rows || [];

  const handleExport = async () => {
    try {
      const res = await aPIClient.request({
        url: `${apiConfig.apiIot}${apiUrlMap.wagonBalanceExport}`,
        method: "post",
        data: {
          ...busParams,
          ...searchValues,
          pageNum,
          pageSize,
        },
        headers: {
          "system-id": systemIds.zhgd,
        },
      });
      console.log(res, "res");
    } catch (error) {}
  };

  const handleOpenWeighbridgeDtDialog = (id?: string) => {
    setWeighbridgeDtId(id);
    setDialogOpen(true);
  };

  return (
    <>
      <div
        className={css`
          width: 100%;
          height: 100%;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            padding-right: 0.24rem;
          `}
          style={headStyle}
        >
          {isPc && <ExportButton onClick={handleExport}>导出</ExportButton>}
        </div>
        <div
          style={bodyStyle}
          className={css`
            width: 100%;
            padding-bottom: ${isPc ? "0.24rem" : "0"};
            overflow: hidden;
          `}
        >
          <div
            className={css`
              width: 100%;
              height: 100%;
              max-height: 100%;
              overflow: hidden auto;
              padding: 0 0.24rem 0 0.24rem;
            `}
          >
            <CollapsibleForm onChange={setSearchValues} fields={fields} />
            <EmptyKit loading={isLoading} empty={wagonBalanceRows.length === 0}>
              <SummaryStatistics
                pageNum={pageNum}
                pageSize={pageSize}
                searchValues={searchValues}
              />
              {wagonBalanceRows.map((row, index) => {
                return (
                  <WeighbridgeItem
                    key={row.id + index}
                    row={row}
                    handleOpenWeighbridgeDtDialog={
                      handleOpenWeighbridgeDtDialog
                    }
                  />
                );
              })}
              <Pagination
                {...paginationProps}
                simple={!isPc}
                total={wagonBalanceTotal}
              />
            </EmptyKit>
          </div>
        </div>
      </div>
      <WeighbridgeDtDialog
        id={weighbridgeDtId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
}
