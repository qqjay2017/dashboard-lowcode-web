import { css } from "@emotion/css";
import { useState } from "react";
import { getSchemeWrap } from "./getSchemeWrap";
import { menuItem } from "./menuItem";
import { settingSchema } from "./settingSchema";
import { RecentDateSelect } from "./RecentDateSelect";
import { useFrameSizeStyle, useQueryToBusParams } from "@/schema-component";
import { EmptyKit } from "@/style-components";
import type { SchemComponentWithDataSourceProps } from "@/types";

export const LaborAttendance = ({
  query,
}: SchemComponentWithDataSourceProps) => {
  const [tabValue, setTabValue] = useState<string>("1");
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const queryParams = useQueryToBusParams(query);
  return (
    <>
      <div
        style={headStyle}
        className={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
        `}
      >
        <RecentDateSelect value={tabValue} onChange={setTabValue} />
      </div>
      <div
        style={bodyStyle}
        className={css`
          width: 100%;
          padding: 0.16rem;
          overflow: hidden hidden;
        `}
      >
        <EmptyKit>
          <div
            className={css`
              width: 100%;
              min-height: 100%;
            `}
          >
            123
          </div>
        </EmptyKit>
      </div>
    </>
  );
  return <div>LaborAttendance</div>;
};

LaborAttendance.displayName = "LaborAttendance";
LaborAttendance.schemaFn = getSchemeWrap;
LaborAttendance.menuItem = menuItem;
LaborAttendance.settingSchema = settingSchema;
