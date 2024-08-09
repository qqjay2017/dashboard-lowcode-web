import { css } from "@emotion/css";

import SelectValueArrow from "../../query/ProjectSelect/SelectValueArrow";
import type { SelectValueProps } from "@/dashboard-themes/ui";
import { BusSelect } from "@/dashboard-themes/ui";
import type { FormItemComponentProps } from "@/types";
import { cx, ellipTextStyle } from "@/utils";

function CargoSelectValue({
  children,
  value,
  placeholder,
  open,
  className,
  label,
  setOpen,
  ...other
}: SelectValueProps) {
  return (
    <div
      className={cx(
        css`
          user-select: none;
          position: relative;
          width: 100%;
          height: 100%;
          background: #00021f;
          box-shadow: inset 0px 0px 9px 0px #507ff7;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #2196ff;
          display: flex;
          align-items: center;
        `,
        className
      )}
    >
      <div
        className={cx(
          css`
            width: calc(100% - 0.3rem);
            padding: 0 0.1rem;
            color: #008dfa;
            font-size: 0.14rem;
            line-height: 0.14rem;
          `,
          ellipTextStyle
        )}
      >
        {placeholder || value}
      </div>
      <SelectValueArrow
        open={open}
        className={css`
          width: 0.1rem;
          margin-top: -0.06rem;
          cursor: pointer;
        `}
      />
    </div>
  );
}

export default function CargoTypeSelect({
  value,
  onChange,
}: FormItemComponentProps) {
  return (
    <BusSelect
      width="1.8rem"
      value="123"
      options={[
        {
          label: "123",
          value: "123",
        },
        {
          label: "456",
          value: "456",
        },
      ]}
      renderSelctValue={CargoSelectValue}
    />
  );
}
