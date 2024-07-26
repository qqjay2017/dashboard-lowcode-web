import { css } from "@emotion/css";

import type { PropsWithChildren } from "react";
import { ResourceWidget } from "../widgets";

export function CompositePanel({ children }: PropsWithChildren) {
  return (
    <div
      className={css`
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;

          z-index: 2;
          position: relative;
        `}
      >
        tabs
      </div>
      <div
        className={css`
          width: 300px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: content-box;
        `}
      >
        {children}
      </div>
    </div>
  );
}
