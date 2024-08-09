import type { ReactNode } from "react";
import React, { useState } from "react";
import { css } from "@emotion/css";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import type { FormItemComponentProps } from "@/types";
import { useDashboardRoot } from "@/schema-component/hooks";

export type SelectValueProps = IBusSelectOption & {
  open?: boolean;
  setOpen?: Function;
  className?: string;
  children?: ReactNode;
};
interface IBusSelectOption {
  value?: string;
  label?: string;
  placeholder?: string;
}

function defaultRenderSelctValue({ label, placeholder }: SelectValueProps) {
  return label || placeholder;
}
interface IBusSelectProps extends FormItemComponentProps {
  options?: IBusSelectOption[];
  width?: string;
  height?: string;
  renderSelctValue?: (v: SelectValueProps) => React.ReactNode;
}

function findItem(options: IBusSelectOption[], value: string) {
  return options.find((option) => option && option.value === value);
}

export function BusSelect({
  value,
  onChange,
  options = [],
  width = "100%",
  height = "0.32rem",
  renderSelctValue = defaultRenderSelctValue,
}: IBusSelectProps) {
  const { isPc } = useDashboardRoot();
  const [open, setOpen] = useState(false);
  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={(e) => {
        onChange && onChange(e, findItem(options, e));
      }}
    >
      <SelectTrigger
        className={css`
          all: unset;
          width: ${width};
          height: ${isPc ? height : "0.64rem"};
          border: none;
          cursor: pointer;
        `}
      >
        {renderSelctValue({
          ...(findItem(options, value) || {
            label: "",
            value: "",
            placeholder: "请选择",
          }),
          open,
          setOpen,
        })}
      </SelectTrigger>
      <SelectContent
        sideOffset={5}
        style={{
          width,
        }}
      >
        {options.map((option) => {
          return (
            <SelectItem
              key={option.value + option.label}
              disabled={option.value === value}
              value={option.value}
              textValue={option.label}
            >
              <div
                className={css`
                  padding: 0 0.16rem;
                `}
              >
                {option.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
