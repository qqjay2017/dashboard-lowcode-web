import { css } from "@emotion/css";

import { useState } from "react";
import CargoTypeSelect from "./CargoTypeSelect";
import DeviationOfCargoChart from "./DeviationOfCargoChart";

import { useFrameSizeStyle, useWagonQuery } from "@/schema-component/hooks";
import { EmptyKit } from "@/dashboard-themes/style-components";
import type { SchemComponentWithDataSourceProps } from "@/types";
import { safeArraySelect } from "@/schema-component/shared";

export default function DeviationOfCargo({
  queryKeys,
}: SchemComponentWithDataSourceProps) {
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  const [goodsName, setGoodsName] = useState("");

  const { data, isLoading } = useWagonQuery({ type: 0 }, (res) => {
    const firstGoodsName = (res?.rows || []).find((row) => row.name)?.name;
    setGoodsName(firstGoodsName || "");
  });

  const rows = safeArraySelect(data?.rows || []);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <EmptyKit loading={isLoading} empty={!goodsName || rows.length === 0}>
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
            options={rows
              .filter((row) => !!row.name)
              .map((row) => {
                return {
                  ...row,
                  label: row.name,
                  value: row.name,
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
