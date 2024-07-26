import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";

export function StudioPanel({ children }: PropsWithChildren) {
  return (
    <div
      className={css`
        display: flex;
        width: 100%;
        height: 100%;
        flex: 1;
        min-height: 0;
        position: relative;
        overflow: hidden;
      `}
    >
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      >
        <div
          className={css`
            display: flex;
            width: 100%;
            height: 100%;
            flex: 1;
            min-height: 0;
            position: relative;
            overflow: hidden;
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
