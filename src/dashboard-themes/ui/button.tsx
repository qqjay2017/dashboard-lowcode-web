import { css } from "@emotion/css";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cx } from "@/utils";

interface IExportButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export function ExportButton({
  children,
  className,
  ...props
}: IExportButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        css`
          all: unset;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #008dfa;
          height: 0.3rem;
          padding: 0 0.24rem;

          font-weight: 400;
          font-size: 0.14rem;
          color: #008dfa;
          line-height: 0.3rem;
          cursor: pointer;
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
  return (
    <button
      type="button"
      className={cx(
        css`
          all: unset;
          border: 1px solid #008dfa;
          height: 0.3rem;
          padding: 0 0.24rem;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.3rem;
          background: #12233e;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid #3d5478;
          color: #c3cadb;
          cursor: pointer;
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
  return (
    <button
      type="button"
      className={cx(
        css`
          all: unset;

          height: 0.3rem;
          padding: 0 0.24rem;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.3rem;

          border-radius: 2px 2px 2px 2px;
          border: 1px solid #3d5478;
          color: #fff;
          border: 1px solid #008dfa;

          background: #008dfa;
          border-radius: 2px 2px 2px 2px;
          cursor: pointer;
        `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
