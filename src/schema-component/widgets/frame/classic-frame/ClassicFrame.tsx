import type { PropsWithChildren } from "react";
import React from "react";

import { Schema } from "@formily/react";
import { css } from "@emotion/css";
import { useClassicFrameStyle } from "./styles";

import { ClassicFrameMenuItem } from "./ClassicFrameMenuItem";
import { ClassicFrameSettingSchema } from "./ClassicFrameSettingSchema";
import { cn } from "@/utils";
import { useToken } from "@/schema-component/antd/style";

import { useFrameSizeStyle } from "@/schema-component";

export interface ClassicFrameProps extends PropsWithChildren {
  title?: string;
  subTitle?: string;
  extra?: string;
  extraProps?: any;
  style?: React.CSSProperties;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function ClassicFrame({
  children,

  title,
  subTitle,
  extra,
  extraProps,
  style,
  className,
  titleClassName,
  contentClassName,
}: ClassicFrameProps) {
  const { token } = useToken();

  const hasTitle = title || extra;
  const classicFrameStyle = useClassicFrameStyle({ hasTitle: !!hasTitle });
  const { headStyle, bodyStyle } = useFrameSizeStyle();

  return (
    <div
      className={cn("nodeContentRenderer", classicFrameStyle.styles, className)}
      style={style}
    >
      {hasTitle ? (
        <div
          className={cn("nodeContentRendererTitle", titleClassName)}
          style={headStyle}
        >
          <div className={cn("nodeContentRendererTitleBg")}></div>
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
          "nodeContentRendererContent",
          contentClassName
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
export function ClassicFrameSchemeWrap(inject: any = {}) {
  return new Schema({
    _isJSONSchemaObject: true,
    version: "2.0",
    type: "void",
    "x-component": "ClassicFrame",
    "x-settings": "settings:block",
    "x-decorator": "PositionDecorator",
    "x-component-props": {
      title: "默认标题",
      ...inject?.["x-component-props"],
    },
    ...inject,
    "x-decorator-props": {
      padding: [0, 0, 0, 0],
      w: 3,
      h: 3,
      ...inject?.["x-decorator-props"],
    },
  });
}

ClassicFrame.displayName = "ClassicFrame";
ClassicFrame.schemaFn = ClassicFrameSchemeWrap;
ClassicFrame.menuItem = ClassicFrameMenuItem;
ClassicFrame.settingSchema = ClassicFrameSettingSchema;
