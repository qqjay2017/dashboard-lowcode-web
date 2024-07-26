import { css } from "@emotion/css";
import { TreeNode } from "@/designable/core";

const elements = [
  {
    componentName: "Field",
    props: {
      title: "卡片",
    },
  },
];
const source = {
  title: "输入框",
  icon: "InputSource",
  elements,
  node: new TreeNode({
    componentName: "$$ResourceNode$$",
    isSourceNode: true,
    children: elements || [],
  }),
};

export function ResourceWidget() {
  const { node } = source;
  console.log(source.node, "source node");
  return (
    <div
      data-designer-source-id={node.id}
      className={css`
        min-height: 40px;
        border: 1px solid red;
      `}
    >
      {source.title}
    </div>
  );
}
