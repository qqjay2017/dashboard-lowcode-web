import React, { useRef } from "react";
import { css } from "@emotion/css";
import { useDesigner, useViewport } from "../../hooks";
import { Selection } from "./Selection";

export function AuxToolWidget() {
  const engine = useDesigner();
  const viewport = useViewport();

  const ref = useRef<HTMLDivElement>();

  if (!viewport) return null;
  return (
    <div
      ref={ref}
      className={css`
        transform: perspective(1px) translate3d(0, 0, 0);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9998;
      `}
    >
      <Selection />
    </div>
  );
}
