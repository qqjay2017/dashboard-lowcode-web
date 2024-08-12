import type { TableHTMLAttributes } from "react";
import { css } from "@emotion/css";
import { cx } from "@/utils";

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
  return (
    <th
      {...props}
      className={cx(
        css`
          font-weight: 400;
          font-size: 0.14rem;
          color: #ffffff;
          line-height: 0.22rem;
          padding: 0.1rem 0;
          flex: 1;
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
  return (
    <td
      {...props}
      className={cx(
        css`
          font-weight: 400;
          font-size: 0.14rem;
          color: #ffffff;
          line-height: 0.22rem;
          padding: 0.1rem 0;
          flex: 1;
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
