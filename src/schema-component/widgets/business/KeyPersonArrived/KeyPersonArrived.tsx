import { get } from "lodash-es";
import { css } from "@emotion/css";

import type { KeyPersonItemType } from "./types";
import { KeyPersonnelItem } from "./KeyPersonnelItem";
import type { SchemComponentWithDataSourceProps } from "@/types";

import { EmptyKit } from "@/dashboard-themes/style-components";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";
import { safeArraySelect } from "@/schema-component/shared";

function KeyPersonArrivedMain({
  busDataRes,
  isBusDataLoading,
}: SchemComponentWithDataSourceProps) {
  const list: KeyPersonItemType[] = safeArraySelect(busDataRes || []);

  return (
    <EmptyKit loading={isBusDataLoading} empty={!list.length}>
      <div
        className={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${list.length}, 1fr); /* 4列 */
          grid-template-rows: repeat(1, 1fr);
          align-items: center;
          justify-content: center;
        `}
      >
        {list.map((p, index) => {
          return <KeyPersonnelItem key={index} {...p} />;
        })}
      </div>
    </EmptyKit>
  );
}

export const KeyPersonArrived = injectApiInfo(KeyPersonArrivedMain);
