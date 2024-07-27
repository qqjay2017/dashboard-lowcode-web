import React from "react";
import { Button } from "antd";

import { TreeNode } from "@/designable/core";

export interface ICopyProps {
  node: TreeNode;
  style?: React.CSSProperties;
}

export const Copy: React.FC<ICopyProps> = ({ node, style }) => {
  const prefix = "aux-copy";
  if (node === node.root) return null;
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        TreeNode.clone([node]);
      }}
    >
      copy
    </Button>
  );
};

Copy.displayName = "Copy";
