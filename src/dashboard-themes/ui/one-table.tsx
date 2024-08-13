import type { TableHTMLAttributes } from "react";
import { css } from "@emotion/css";
import { cx } from "@/utils";
import { useDashboardRoot, useScrollBarStyle } from "@/schema-component/hooks";

export function OneTable({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      {...props}
      className={cx(
        css`
          border-left: 1px solid rgba(125, 139, 160, 1);
          border-top: 1px solid rgba(125, 139, 160, 1);
          width: 100%;
          border-collapse: collapse; /* 合并边框 */
          table-layout: fixed;
        `,
        className
      )}
    >
      {children}
    </table>
  );
}

export function OneTableHeader({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead {...props} className={cx(css``, className)}>
      {children}
    </thead>
  );
}

export function OneTableRow({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr {...props} className={cx(css``, className)}>
      {children}
    </tr>
  );
}

export function OneTableHead({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableCellElement>) {
  const { isPc } = useDashboardRoot();
  return (
    <th
      {...props}
      className={cx(
        css`
          min-width: 150px;
          font-weight: 400;

          color: #ffffff;
          font-size: ${isPc ? "0.14rem" : "0.28rem"};
          line-height: ${isPc ? " 0.22rem" : " 0.32rem"};
          padding: 0.1rem 0.32rem;

          text-align: center;
          border-bottom: 1px solid rgba(125, 139, 160, 1);
          border-right: 1px solid rgba(125, 139, 160, 1);
        `,
        className
      )}
    >
      {children}
    </th>
  );
}
export function OneTableBody({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody {...props} className={cx(css``, className)}>
      {children}
    </tbody>
  );
}
export function OneTableCell({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableCellElement>) {
  const { isPc } = useDashboardRoot();
  return (
    <td
      {...props}
      className={cx(
        css`
          min-width: 150px;
          font-weight: 400;
          font-size: ${isPc ? " 0.14rem" : " 0.28rem"};
          color: #ffffff;
          line-height: ${isPc ? " 0.22rem" : " 0.32rem"};
          padding: 0.1rem 0.32rem;

          text-align: center;
          border-bottom: 1px solid rgba(125, 139, 160, 1);
          border-right: 1px solid rgba(125, 139, 160, 1);
        `,
        className
      )}
    >
      {children}
    </td>
  );
}

export function OneTableContainer({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLDivElement>) {
  const { styles } = useScrollBarStyle();
  return (
    <div
      {...props}
      className={cx(
        css`
          width: 100%;
          overflow-x: auto;
        `,
        styles,

        className
      )}
    >
      {children}
    </div>
  );
}
