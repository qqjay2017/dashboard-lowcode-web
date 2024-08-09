import { css } from "@emotion/css";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cx } from "@/utils";
import { useDashboardRoot } from "@/schema-component/hooks";

const buttonBaseStyle = css`
  all: unset;
  height: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;
  line-height: 0.3rem;
`;

interface IExportButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export function ExportButton({
  children,
  className,
  ...props
}: IExportButtonProps) {
  const { isPc } = useDashboardRoot();
  return (
    <button
      type="button"
      className={cx(
        buttonBaseStyle,
        css`
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #008dfa;
          height: 0.3rem;
          padding: 0 0.24rem;

          font-size: ${isPc ? "0.14rem" : "0.2rem"};
          color: #008dfa;
        `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ResetButton({
  children,
  className,
  ...props
}: IExportButtonProps) {
  const { isPc } = useDashboardRoot();
  return (
    <button
      type="button"
      className={cx(
        buttonBaseStyle,
        css`
          border: 1px solid #008dfa;

          padding: 0 0.24rem;
          font-weight: 400;
          font-size: ${isPc ? "0.14rem" : "0.2rem"};
          line-height: 0.3rem;
          background: #12233e;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #3d5478;
          color: #c3cadb;
        `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SubmitButton({
  children,
  className,
  ...props
}: IExportButtonProps) {
  const { isPc } = useDashboardRoot();
  return (
    <button
      type="button"
      className={cx(
        buttonBaseStyle,
        css`
          padding: 0 0.24rem;
          font-size: ${isPc ? "0.14rem" : "0.2rem"};
          line-height: 0.3rem;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #3d5478;
          color: #fff;
          border: 1px solid #008dfa;

          background: #008dfa;
          border-radius: 2px 2px 2px 2px;
        `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
