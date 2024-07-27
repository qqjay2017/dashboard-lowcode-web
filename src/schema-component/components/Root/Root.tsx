import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";
import { createBehavior, createResource } from "@/designable/core";
import { type DnFC, useDesigner } from "@/designable/react";

interface IRootProps extends PropsWithChildren {}
export const Root: DnFC<IRootProps> = ({ children, ...props }: IRootProps) => {
  const designer = useDesigner();
  const designerProps = {
    [designer.props.nodeIdAttrName]: props["data-designer-node-id"],
  };
  return (
    <div
      id="Root"
      {...designerProps}
      className={css`
        width: 1920px;
        height: 1080px;
        border: 1px solid greenyellow;
      `}
    >
      {children}
    </div>
  );
};

Root.Behavior = createBehavior({
  name: "Root",
  selector: "Root",
  designerProps: {
    droppable: true,
  },
});

Root.Resource = createResource({
  icon: "CardSource",
  elements: [
    {
      componentName: "Root",
      props: {
        type: "void",
        "x-component": "Root",
        "x-component-props": {
          title: "Title",
        },
      },
    },
  ],
});
