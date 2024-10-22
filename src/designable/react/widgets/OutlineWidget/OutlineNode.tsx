import React, { useContext, useEffect, useRef } from "react";
import { autorun } from "@formily/reactive";
import { observer } from "@formily/reactive-react";
import cls from "classnames";
import { css } from "@emotion/css";
import {
  useCursor,
  useDesigner,
  useMoveHelper,
  useSelection,
} from "../../hooks";
import { NodeTitleWidget } from "../NodeTitleWidget";
import { NodeContext } from "./context";
import IconWidget from "@/designable/react/widgets/IconWidget";
import { CursorStatus, DragMoveEvent } from "@/designable/core";
import type { TreeNode } from "@/designable/core";
import { isFn } from "@/designable/shared";
import { cn } from "@/utils";
import "./styles.less";

export interface IOutlineTreeNodeProps {
  node: TreeNode;
  style?: React.CSSProperties;
  className?: string;
  workspaceId?: string;
}

export const OutlineTreeNode: React.FC<IOutlineTreeNodeProps> = observer(
  ({ node, className, style, workspaceId }) => {
    const prefix = "dn-outline-tree-node";
    const engine = useDesigner();
    const ref = useRef<HTMLDivElement>();
    const ctx = useContext(NodeContext);
    const request = useRef(null);
    const cursor = useCursor();
    const selection = useSelection(workspaceId);
    const moveHelper = useMoveHelper(workspaceId);

    useEffect(() => {
      return engine.subscribeTo(DragMoveEvent, () => {
        const closestNodeId = moveHelper?.closestNode?.id;

        const id = node.id;
        if (!ref.current) return;
        if (closestNodeId === id) {
          if (!ref.current.classList.contains("droppable")) {
            ref.current.classList.add("droppable");
          }
          if (!ref.current.classList.contains("expanded")) {
            if (request.current) {
              clearTimeout(request.current);
              request.current = null;
            }
            request.current = setTimeout(() => {
              ref.current.classList.add("expanded");
            }, 600);
          }
        } else {
          if (request.current) {
            clearTimeout(request.current);
            request.current = null;
          }
          if (ref.current.classList.contains("droppable")) {
            ref.current.classList.remove("droppable");
          }
        }
      });
    }, [node, moveHelper, cursor]);

    useEffect(() => {
      return autorun(() => {
        const id = node.id;
        if (!ref.current) return;
        if (ref.current.classList.contains("selected")) {
          ref.current.classList.remove("selected");
        }
        if (
          cursor.status === CursorStatus.Dragging &&
          moveHelper?.dragNodes?.length
        ) {
          if (ref.current.classList.contains("selected")) {
            ref.current.classList.remove("selected");
          }
        }
      });
    }, [node, selection, moveHelper]);

    if (!node) return null;

    const renderIcon = (node: TreeNode) => {
      const icon = node.designerProps.icon;
      if (icon) {
        return <IconWidget infer={icon} size={12} />;
      }
      if (node === node?.root) {
        return <IconWidget infer="Page" size={12} />;
      } else if (node.designerProps?.droppable) {
        return <IconWidget infer="Container" size={12} />;
      }
      return <IconWidget infer="Component" size={12} />;
    };

    const renderTitle = (node: TreeNode) => {
      if (isFn(ctx.renderTitle)) return ctx.renderTitle(node);
      return (
        <span>
          <NodeTitleWidget node={node} />
        </span>
      );
    };

    return (
      <div
        style={style}
        ref={ref}
        className={cn(
          prefix,
          className,
          "expanded",
          css`
            position: relative;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: -webkit-fit-content;
            width: -moz-fit-content;
            width: fit-content;
            min-width: 100%;
          `
        )}
        data-designer-outline-node-id={node.id}
      >
        <div
          className={cn(
            `${prefix}-header`,
            css`
              display: flex;
              min-height: 32px;

              width: fit-content;
              min-width: 100%;
              align-items: center;
              color: var(--dn-outline-tree-node-header-color);
              position: relative;
              padding-left: 8px;
            `
          )}
        >
          <div
            className={cn(
              `${prefix}-header-head`,
              css`
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                pointer-events: none;
              `
            )}
            style={{
              left: -node.depth * 16,
              width: node.depth * 16,
            }}
          ></div>
          <div
            className={cn(
              `${prefix}-header-content`,
              css`
                display: flex;
                align-items: center;
                transition: all 0.15s ease-in;
                transform-origin: left;

                width: fit-content;
                min-width: 100%;
                height: 100%;
                justify-content: space-between;
                font-size: 12px;
              `
            )}
          >
            <div className={`${prefix}-header-base`}>
              {(node?.children?.length > 0 || node === node.root) && (
                <div
                  className={`${prefix}-expand`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (ref.current?.classList?.contains("expanded")) {
                      ref.current?.classList.remove("expanded");
                    } else {
                      ref.current?.classList.add("expanded");
                    }
                  }}
                >
                  <IconWidget infer="Expand" size={18} />
                </div>
              )}
              <div className={`${prefix}-icon`}>{renderIcon(node)}</div>
              <div className={`${prefix}-title`}>{renderTitle(node)}</div>
            </div>
            <div
              className={`${prefix}-header-actions`}
              data-click-stop-propagation
            >
              {node !== node.root && (
                <IconWidget
                  className={cls(`${prefix}-hidden-icon`, {
                    hidden: node.hidden,
                  })}
                  infer={node.hidden ? "EyeClose" : "Eye"}
                  size={14}
                  onClick={() => {
                    node.hidden = !node.hidden;
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={`${prefix}-children`}>
          {node.children?.map((child) => {
            return (
              <OutlineTreeNode
                node={child}
                key={child.id}
                workspaceId={workspaceId}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
