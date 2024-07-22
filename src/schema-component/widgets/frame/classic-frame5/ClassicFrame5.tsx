import type { PropsWithChildren } from "react";
import React, { useMemo } from "react";

import { Schema } from "@formily/react";
import { css } from "@emotion/css";
import type { ClassicFrameProps } from "../classic-frame/ClassicFrame";
import { useClassicFrame5Style } from "./styles";

import { getSchemeWrap } from "./getSchemeWrap";
import { menuItem } from "./menuItem";
import { settingSchema } from "./settingSchema";
import { cn, sizeFormat } from "@/utils";
import { useToken } from "@/style";

import { useDashboardRoot } from "@/schema-component/components";
import { useFrameSizeStyle } from "@/schema-component";

interface ClassicFrame5Props extends ClassicFrameProps {}

export function ClassicFrame5({
  children,

  title,
  subTitle,
  extra,
  extraProps,
  style,
  className,
  titleClassName,
  contentClassName,
}: ClassicFrame5Props) {
  const { token } = useToken();
  // const fieldSchema = useFieldSchema();
  const hasTitle = title || extra;
  const classicFrameStyle = useClassicFrame5Style({ hasTitle: !!hasTitle });

  const { headStyle, bodyStyle } = useFrameSizeStyle();

  return (
    <div
      className={cn(
        "nodeContent5Renderer",
        classicFrameStyle.styles,
        className,
      )}
      style={style}
    >
      {hasTitle ? (
        <div
          className={cn("nodeContent5RendererTitle", titleClassName)}
          style={headStyle}
        >
          {title ? <div className={cn("nrtTitle")}>{title}</div> : null}
          {subTitle ? (
            <div
              className={cn("nrtSubTitle")}
              style={{
                color: token.textCommon,
              }}
            >
              {subTitle}
            </div>
          ) : null}
          {extra ? <div className={cn("nrtExtra")}>{extra}</div> : null}
        </div>
      ) : null}

      <div
        className={cn(
          "nodeContent5RendererContent",
          contentClassName,
          // css`
          //   border-width: ${droppable.isOver ? "1px" : "0px"}!important;
          // `
        )}
        style={bodyStyle}
        // ref={droppable.setNodeRef}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: relative;
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

ClassicFrame5.displayName = "ClassicFrame5";

ClassicFrame5.schemaFn = getSchemeWrap;
ClassicFrame5.menuItem = menuItem;
ClassicFrame5.settingSchema = settingSchema;
