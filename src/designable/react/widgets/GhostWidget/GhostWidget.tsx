import React, { useEffect, useRef } from "react";
import { autorun } from "@formily/reactive";
import { observer } from "@formily/reactive-react";
import { useCursor, useDesigner } from "../../hooks";
import { CursorStatus } from "@/designable/core";

export const GhostWidget = observer(() => {
  const designer = useDesigner();
  const cursor = useCursor();
  const ref = useRef<HTMLDivElement>();

  const movingNodes = designer.findMovingNodes();
  const firstNode = movingNodes[0];

  useEffect(
    () =>
      autorun(() => {
        const transform = `perspective(1px) translate3d(${
          cursor.position?.topClientX - 18
        }px,${cursor.position?.topClientY - 12}px,0) scale(0.8)`;
        console.log(transform, "transform");
        if (!ref.current) return;
        ref.current.style.transform = transform;
      }),
    [designer, cursor]
  );
  console.log(firstNode, cursor, "firstNode");
  const renderNodes = () => {
    return (
      <span
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div>{firstNode.componentName}</div>
        {movingNodes.length > 1 ? "..." : ""}
      </span>
    );
  };
  if (!firstNode) return null;

  return cursor.status === CursorStatus.Dragging ? (
    <div ref={ref}>{renderNodes()}</div>
  ) : null;
});
