import { css } from "@emotion/css";
import { useState } from "react";
import CollapsibleForm from "./CollapsibleForm";
import { fields } from "./fields";
import SummaryStatistics from "./SummaryStatistics";
import WeighbridgeItem from "./WeighbridgeItem";
import { useFrameSizeStyle } from "@/schema-component/hooks";
import { ExportButton } from "@/dashboard-themes/ui";

async function handleExport() {}

export default function Weighbridge() {
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const [searchValues, setSearchValues] = useState({});

  return (
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
        <ExportButton onClick={handleExport}>导出</ExportButton>
      </div>
      <div
        className={css`
          overflow: hidden auto;
          padding: 0 0.24rem;
        `}
        style={bodyStyle}
      >
        <CollapsibleForm onChange={setSearchValues} fields={fields} />
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
      </div>
    </div>
  );
}
