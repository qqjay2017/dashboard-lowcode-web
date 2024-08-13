import { Select } from "antd";
import { observer } from "@formily/react";
import { useWagonQuery } from "@/schema-component/hooks";

import type { FormItemComponentProps } from "@/types";
import { safeArraySelect } from "@/schema-component/shared";

const GoodsDevCompanyListSelect = observer(
  ({ value, onChange, onBlur }: FormItemComponentProps) => {
    const { data } = useWagonQuery({ type: 1 });
    const rows = safeArraySelect(data?.rows || []);
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
          .map((row) => {
            return {
              ...row,
              label: row.name,
              value: row.name,
            };
          })}
      />
    );
  }
);

export default GoodsDevCompanyListSelect;
