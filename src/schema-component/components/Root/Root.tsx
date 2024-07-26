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
        border: 1px solid red;
      `}
    >
      <h1>11</h1>
      {children}
      <h1>22</h1>
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
