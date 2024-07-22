import { Checkbox } from "antd";
import type { FormItemComponentProps } from "@/types";

export const DepFieldSetFormItem = ({
  value = [],
  onChange,
}: FormItemComponentProps) => {
  return (
    <Checkbox.Group
      options={[
        {
          label: "时间查询",
          value: "quarterSelect",
        },
        {
          label: "项目查询",
          value: "projectSelect",
        },
      ]}
      value={value}
      onChange={onChange}
    />
  );
};
