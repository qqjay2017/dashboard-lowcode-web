import { css } from "@emotion/css";

export function Logo() {
  return (
    <div
      className={css`
        padding-left: 24px;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        font-weight: 600;
      `}
    >
      大屏可视化设计器
    </div>
  );
}
