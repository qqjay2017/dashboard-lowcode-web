import { css } from "@emotion/css";
import { forwardRef } from "react";
import SelectValueArrow from "./SelectValueArrow";
import { useToken } from "@/schema-component/antd/style";
import { cn, ellipTextStyle } from "@/utils";
import type { SelectValueProps } from "@/dashboard-themes/ui";

export interface IProjectSelectValueProps {
  value?: string;
  children?: any;
  placeholder?: string;
  open?: boolean;
  className?: string;
}

export function ProjectSelectValue({
  children,
  value,
  label,
  placeholder,
  open,
  className,
  ...props
}: SelectValueProps) {
  const { token } = useToken();
  return (
    <div
      className={cn(
        className,
        css`
          position: relative;
          width: 100%;
          height: 100%;

          color: ${token.popover.foreground};
          padding-left: 0.12rem;
          position: relative;
          cursor: pointer;
        `
      )}
    >
      <div
        className={css`
          height: 100%;
          width: calc(100% - 0.4rem);
          font-weight: 500;
          font-size: 0.22rem;
          color: #c3f4ff;
          line-height: 0.22rem;
          margin-right: 8px;

          display: flex;
          align-items: center;
          user-select: none;
          ${ellipTextStyle}
        `}
      >
        {label || placeholder}
      </div>
      <SelectValueArrow open={open} />
    </div>
  );
}
