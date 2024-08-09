import { css } from "@emotion/css";

import { get } from "lodash-es";
import { useState } from "react";
import CargoTypeSelect from "./CargoTypeSelect";
import DeviationOfCargoChart from "./DeviationOfCargoChart";
import {
  useDataBindFetch,
  useFrameSizeStyle,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import { EmptyKit } from "@/dashboard-themes/style-components";
import type { SchemComponentWithDataSourceProps } from "@/types";

export default function DeviationOfCargo({
  queryKeys,
}: SchemComponentWithDataSourceProps) {
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const [goodsName, setGoodsName] = useState("");
  const busParams = useQueryToBusParams(queryKeys);

  const { data, isLoading } = useDataBindFetch(
    {
      dataSourceId: "5fa837fa-1234-4b53-85e3-74d4a903eacd",
    },
    {
      ...busParams,
    },
    (res) => {
      const firstGoodsName = get(res, "ratioList[0].goodsName", "") || "";
      setGoodsName(firstGoodsName);
    }
  );

  const ratioList = get(data, "ratioList", []) || [];

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <EmptyKit
        loading={isLoading}
        empty={!goodsName || ratioList.length === 0}
      >
        <div
          className={css`
            display: flex;

            justify-content: flex-end;
            padding-top: 0.12rem;
            padding-right: 0.24rem;
          `}
          style={headStyle}
        >
          <CargoTypeSelect
            value={goodsName}
            onChange={setGoodsName}
            options={ratioList.map((ratio) => {
              return {
                ...ratio,
                label: ratio.goodsName,
                value: ratio.goodsName,
              };
            })}
          />
        </div>
        <div
          className={css`
            width: 100%;

            overflow: hidden hidden;
          `}
          style={bodyStyle}
        >
          <DeviationOfCargoChart goodsName={goodsName} />
        </div>
      </EmptyKit>
    </div>
  );
}
