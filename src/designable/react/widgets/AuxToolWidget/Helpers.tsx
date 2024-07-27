import React, { useLayoutEffect, useRef, useState } from "react";
import { reaction } from "@formily/reactive";
import cls from "classnames";
import { css } from "@emotion/css";
import { useViewport } from "../../hooks";
import { Selector } from "./Selector";
import type { TreeNode } from "@/designable/core";
import type { Rect } from "@/designable/shared";
import { cn } from "@/utils";
// import { Copy } from "./Copy";
// import { Delete } from "./Delete";
// import { DragHandler } from "./DragHandler";

const HELPER_DEBOUNCE_TIMEOUT = 100;

const helpsStyle = css`
  position: absolute;
  pointer-events: all;
  z-index: 10;
  user-select: none;
  &.bottom-right {
    top: 100%;
    right: 0;
  }

  &.bottom-left {
    top: 100%;
    left: 0;
  }

  &.bottom-center {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  &.inner-top-right {
    top: -2px;
    right: 2px;
  }

  &.inner-top-left {
    top: -2px;
    left: 2px;
  }

  &.inner-top-center {
    top: -2px;
    right: 2px;
  }

  &.inner-bottom-right {
    bottom: -2px;
    right: 2px;
  }

  &.inner-bottom-left {
    bottom: -2px;
    left: 2px;
  }

  &.inner-bottom-center {
    bottom: -2px;
    right: 2px;
  }

  &.top-right {
    bottom: 100%;
    right: 0;
  }

  &.top-left {
    bottom: 100%;
    left: 0;
  }

  &.top-center {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const helpersContentStyle = css`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  button {
    font-size: 12px !important;
    display: flex;
    align-items: center;
    padding: 0 3px;
    height: 20px;
  }

  & > * {
    margin-top: 4px;
    margin-bottom: 4px;
    margin-left: 2px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export interface IHelpersProps {
  node: TreeNode;
  nodeRect: DOMRect;
}
export interface IViewportState {
  viewportWidth?: number;
  viewportHeight?: number;
  viewportScrollX?: number;
  viewportScrollY?: number;
  viewportIsScrollTop?: boolean;
  viewportIsScrollBottom?: boolean;
}

export const Helpers: React.FC<IHelpersProps> = ({ node, nodeRect }) => {
  const viewport = useViewport();
  const unmountRef = useRef(false);
  const ref = useRef<HTMLDivElement>();
  const [position, setPosition] = useState("inner-top-right");

  // useLayoutEffect(() => {
  //   let request = null;

  //   const getYInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
  //     if (nodeRect.top - viewport.scrollY > helpersRect.height) {
  //       return "top";
  //     } else if (
  //       viewport.isScrollTop &&
  //       nodeRect.height + helpersRect.height > viewport.height
  //     ) {
  //       return "inner-top";
  //     } else if (
  //       nodeRect.bottom >= viewport.scrollY + viewport.height &&
  //       nodeRect.height + helpersRect.height > viewport.height
  //     ) {
  //       return "inner-bottom";
  //     }

  //     return "bottom";
  //   };

  //   const getXInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
  //     const widthDelta = helpersRect.width - nodeRect.width;
  //     if (widthDelta >= 0) {
  //       if (nodeRect.x < widthDelta) {
  //         return "left";
  //       } else if (nodeRect.right + widthDelta > viewport.width) {
  //         return "right";
  //       } else {
  //         return "center";
  //       }
  //     }
  //     return "right";
  //   };

  //   const update = () => {
  //     const helpersRect = ref.current?.getBoundingClientRect();
  //     if (!helpersRect || !nodeRect) return;
  //     if (unmountRef.current) return;
  //     setPosition(
  //       `${getYInViewport(nodeRect, helpersRect)}-${getXInViewport(
  //         nodeRect,
  //         helpersRect
  //       )}`
  //     );
  //   };

  //   update();

  //   return reaction(
  //     () => [
  //       viewport.width,
  //       viewport.height,
  //       viewport.scrollX,
  //       viewport.scrollY,
  //       viewport.isScrollBottom,
  //       viewport.isScrollTop,
  //     ],
  //     () => {
  //       clearTimeout(request);
  //       request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT);
  //     }
  //   );
  // }, [viewport, nodeRect]);

  if (!nodeRect || !node) return null;

  return (
    <div
      className={cn(
        "aux-helpers",
        {
          [position]: true,
        },
        helpsStyle
      )}
      ref={ref}
    >
      <div className={cls(`aux-helpers-content`, helpersContentStyle)}>
        <Selector node={node} />
        {/* {node?.allowClone() === false ? null : <Copy node={node} />}
        {node?.allowDrag() === false ? null : <DragHandler node={node} />}
        {node?.allowDelete() === false ? null : <Delete node={node} />} */}
      </div>
    </div>
  );
};

Helpers.displayName = "Helpers";
