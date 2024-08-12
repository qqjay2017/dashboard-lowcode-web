import { css } from "@emotion/css";

import { get } from "lodash-es";
import SelectValueArrow from "../../query/ProjectSelect/SelectValueArrow";
import type { IBusSelectProps, SelectValueProps } from "@/dashboard-themes/ui";
import { BusSelect } from "@/dashboard-themes/ui";
import type { FormItemComponentProps } from "@/types";
import { cx, ellipTextStyle } from "@/utils";
import { useDashboardRoot, useWagonQuery } from "@/schema-component/hooks";

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
  const { isPc } = useDashboardRoot();
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
            font-size: ${isPc ? "0.14rem" : "0.28rem"};
          `,
          ellipTextStyle
        )}
      >
        {placeholder || value}
      </div>
      <SelectValueArrow
        open={open}
        className={css`
          width: ${isPc ? " 0.1rem" : " 0.2rem"};
          margin-top: -0.06rem;
          cursor: pointer;
        `}
      />
    </div>
  );
}

interface CargoTypeSelectProps
  extends FormItemComponentProps,
    IBusSelectProps {}

export default function CargoTypeSelect({
  value,
  onChange,
  options,
}: CargoTypeSelectProps) {
  return (
    <BusSelect
      width="1.8rem"
      value={value}
      onChange={onChange}
      options={options}
      renderSelctValue={CargoSelectValue}
    />
  );
}
