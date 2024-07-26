import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";
import { createBehavior, createResource } from "@/designable/core";
import type { DnFC } from "@/designable/react";

interface IRootProps extends PropsWithChildren {}
export const Root: DnFC<IRootProps> = ({ children }: IRootProps) => {
  return (
    <div
      id="Root"
      className={css`
        width: 1920px;
        height: 1080px;
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