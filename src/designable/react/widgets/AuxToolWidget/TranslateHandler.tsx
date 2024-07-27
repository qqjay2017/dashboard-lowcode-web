import React from "react";
import cls from "classnames";
import { injectGlobal } from "@emotion/css";
import { useDesigner } from "../../hooks";

import { IconWidget } from "../IconWidget";
import type { TreeNode } from "@/designable/core";

injectGlobal`
.aux-node-translate-handler {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 40px;
  height: 20px;
  background: #1890ff;
  opacity: 0.5;
  pointer-events: all;
}
`;

export interface ITranslateHandlerProps {
  node: TreeNode;
}

export const TranslateHandler: React.FC<ITranslateHandlerProps> = (props) => {
  const designer = useDesigner();
  const prefix = "aux-node-translate-handler";
  const createHandler = (value: string) => {
    return {
      [designer.props.nodeTranslateAttrName]: value,
      className: cls(prefix, value),
    };
  };
  const allowTranslate = props.node.allowTranslate();
  if (!allowTranslate) return null;
  return (
    <>
      <div {...createHandler("translate")}>
        <IconWidget infer="DragDrop" />
      </div>
    </>
  );
};
