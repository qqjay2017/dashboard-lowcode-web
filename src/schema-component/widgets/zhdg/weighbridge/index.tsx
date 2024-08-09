import { css } from "@emotion/css";
import { useState } from "react";
import CollapsibleForm from "./CollapsibleForm";
import { fields } from "./fields";
import SummaryStatistics from "./SummaryStatistics";
import WeighbridgeItem from "./WeighbridgeItem";
import { useDashboardRoot, useFrameSizeStyle } from "@/schema-component/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ExportButton,
} from "@/dashboard-themes/ui";
import { EmptyKit } from "@/dashboard-themes/style-components";

async function handleExport() {}

export default function Weighbridge() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const [searchValues, setSearchValues] = useState({});
  const { isPc } = useDashboardRoot();

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
          <EmptyKit>
            <SummaryStatistics />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
            <WeighbridgeItem />
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
