import React from "react";
import { observer } from "@formily/reactive-react";
import { get } from "lodash-es";
import type { TreeNode } from "@/designable/core";

export interface INodeTitleWidgetProps {
  node: TreeNode;
}

export const NodeTitleWidget: React.FC<INodeTitleWidgetProps> = observer(
  (props) => {
    const takeNode = () => {
      const node = props.node;
      if (node.componentName === "$$ResourceNode$$") {
        return node.children[0];
      }
      return node;
    };
    const node = takeNode();
    console.log(node, "node");
    const title = get(node, "designerProps.title");

    return <>{title || node.componentName || "componentName"}</>;
  }
);
