import { Select } from "antd";

import { observer } from "@formily/react";

import { useWagonQuery } from "@/schema-component/hooks";

import type { FormItemComponentProps } from "@/types";

const GoodsNameListSelect = observer(
  ({ value, onChange, onBlur }: FormItemComponentProps) => {
    const { data } = useWagonQuery({ type: 0 });
    const rows = data?.rows || [];

    return (
      <Select
        onBlur={onBlur}
        mode="multiple"
        value={value}
        onChange={onChange}
        showSearch
        maxCount={5}
        options={rows
          .filter((row) => row.name)
          .map((ratio) => {
            return {
              ...ratio,
              label: ratio.name,
              value: ratio.name,
            };
          })}
      />
    );
  }
);

export default GoodsNameListSelect;
