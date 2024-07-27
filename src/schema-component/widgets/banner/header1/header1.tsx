import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";

import { GradientTitle } from "./GradientTitle";
import { cn, rs } from "@/utils";
import { createStyles } from "@/schema-component/antd/style";

import { useStrHandlebars } from "@/schema-component/hooks";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";

const useHeader1Styles = createStyles(({ css, token }) => {
  const { themeAssetsPath } = token;
  const url = rs(`/assets/header1/${themeAssetsPath}/bg.png`);
  return css`
    background-image: url(${url});
  `;
});

interface Header1Props extends PropsWithChildren {
  title?: string;
}
export const Header1: DnFC<Header1Props> = ({
  title,
  ...props
}: Header1Props) => {
  const { styles } = useHeader1Styles();

  const titleStr = useStrHandlebars(title);

  return (
    <div
      className={cn(
        styles,
        css`
          width: 100%;
          height: 100%;
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: center bottom;
          position: relative;
        `
      )}
    >
      <div
        className={css`
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        `}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          `}
        >
          <GradientTitle titleStr={titleStr} />
        </div>
        {/* {title} */}
      </div>
    </div>
  );
};
Header1.displayName = "Header1";
Header1.Resource = createResource({
  title: "头部1",
  icon: rs("/assets/schema-component/Header1/header1.png"),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "Header1",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          w: 12,
          h: 1.3,
          padding: [0, 0, 0, 0],
        },
        "x-component-props": {
          title: "{{dashboardDt.name}}",
        },

        "x-reactions": {
          dependencies: {},
          when: true,
          fulfill: {
            schema: {
              "x-component-props.query": "{{$deps}}",
            },
          },
        },
      },
    },
  ],
});

Header1.Behavior = createBehavior({
  name: "Header1",
  selector: (node) =>
    node.componentName === "Field" && node.props["x-component"] === "Header1",
  designerProps: {
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
  },
});
