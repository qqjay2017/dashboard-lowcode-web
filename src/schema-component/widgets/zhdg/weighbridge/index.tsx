import { css } from "@emotion/css";
import { useState } from "react";
import CollapsibleForm from "./CollapsibleForm";
import { fields } from "./fields";
import SummaryStatistics from "./SummaryStatistics";
import WeighbridgeItem from "./WeighbridgeItem";
import type { wagonBalanceRow } from "./types";
import {
  useDashboardRoot,
  useFrameSizeStyle,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ExportButton,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from "@/dashboard-themes/ui";
import { EmptyKit } from "@/dashboard-themes/style-components";
import { useRequest } from "@/api-client";

async function handleExport() {}

export default function Weighbridge() {
  const busParams = useQueryToBusParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const [searchValues, setSearchValues] = useState({});
  const { isPc } = useDashboardRoot();
  const { data: wagonBalanceRes, isLoading } = useRequest(
    "/api/iot/v1/iot/wagon-balance/search",
    {
      data: {
        ...busParams,
        pageNum: 1,
        pageSize: 5,
      },
      method: "POST",
      headers: {
        "system-id": "237718173535821884",
      },
    }
  );

  const wagonBalanceTotal = wagonBalanceRes?.total || 0;
  const wagonBalanceRows: wagonBalanceRow[] = wagonBalanceRes?.rows || [];

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
          className={css`
            overflow: hidden auto;
            padding: 0 0.24rem;
          `}
          style={bodyStyle}
        >
          <CollapsibleForm onChange={setSearchValues} fields={fields} />
          <EmptyKit loading={isLoading} empty={wagonBalanceRows.length === 0}>
            <SummaryStatistics />
            {wagonBalanceRows.map((row, index) => {
              return <WeighbridgeItem key={row.id + index} row={row} />;
            })}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </EmptyKit>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={css`
            width: 1200px;
            height: 859px;
          `}
        >
          <DialogHeader>
            <DialogTitle>设备信息</DialogTitle>
          </DialogHeader>
          <div>123</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
