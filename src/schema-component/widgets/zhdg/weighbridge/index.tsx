import { css } from "@emotion/css";
import { useState } from "react";
import CollapsibleForm from "./CollapsibleForm";
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
      <div style={bodyStyle}>
        <CollapsibleForm onChange={setSearchValues} />
        <div>{JSON.stringify(searchValues)}</div>
      </div>
    </div>
  );
}
