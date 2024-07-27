import React from "react";
import cls from "classnames";
import { useDesigner } from "../../hooks";

import type { TreeNode } from "@/designable/core";

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
      <div {...createHandler("translate")}>FreeMove</div>
    </>
  );
};
