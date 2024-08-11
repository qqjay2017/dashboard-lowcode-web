import type { PropsWithChildren } from "react";

import { css } from "@emotion/css";
import { Viewport } from "../container";
import { cx } from "@/utils";

export default function DesignerViewportPanel({ children }: PropsWithChildren) {
  return (
    <div
      className={cx(
        "DesignerViewportPanel",
        css`
          flex: 1;
          overflow: hidden;
          position: relative;
          z-index: 1;
          background-color: #18181c;
          background-image: linear-gradient(#18181c 14px, transparent 0),
            linear-gradient(90deg, transparent 14px, #86909c 0);
          background-size:
            15px 15px,
            15px 15px;
        `
      )}
    >
      <Viewport>{children}</Viewport>
    </div>
  );
}
