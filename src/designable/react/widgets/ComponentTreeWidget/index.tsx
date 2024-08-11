import React, { Fragment, useEffect, useMemo } from "react";
import { observer } from "@formily/reactive-react";

import { css } from "@emotion/css";
import { ErrorBoundary } from "react-error-boundary";

import { createForm } from "@formily/core";
import {
  useComponents,
  useDesigner,
  useTree,
  useTreeRootProps,
} from "../../hooks";
import { DesignerComponentsContext, TreeNodeContext } from "../../context";
import type { IDesignerComponents } from "../../types";
import { GlobalRegistry } from "@/designable/core";
import type { TreeNode } from "@/designable/core";
import { cn } from "@/utils";
import SchemaComponentOptions from "@/schema-component/core/SchemaComponentOptions";

export interface IComponentTreeWidgetProps {
  style?: React.CSSProperties;
  className?: string;
  components: IDesignerComponents;
}

export interface ITreeNodeWidgetProps {
  node: TreeNode;
  children?: React.ReactChild;
}

export const TreeNodeWidget: React.FC<ITreeNodeWidgetProps> = observer(
  (props: ITreeNodeWidgetProps) => {
    const designer = useDesigner(props.node?.designerProps?.effects);
    const components = useComponents();
    const node = props.node;

    const renderChildren = () => {
      if (node?.designerProps?.selfRenderChildren) return [];
      return node?.children?.map((child) => {
        return <TreeNodeWidget key={child.id} node={child} />;
      });
    };
    const renderProps = (extendsProps: any = {}) => {
      const props = {
        ...node.designerProps?.defaultProps,
        ...extendsProps,
        ...node.props,
        ...node.designerProps?.getComponentProps?.(node),
      };

      if (node.depth === 0) {
        // delete props.style;
      }
      return props;
    };
    const renderComponent = () => {
      const componentName = node.componentName;
      const Component = components[componentName];

      const dataId = {};

      if (Component) {
        if (designer) {
          dataId[designer?.props?.nodeIdAttrName] = node.id;
        }

        return React.createElement(
          Component,
          renderProps(dataId),
          ...renderChildren()
        );
      } else {
        if (node?.children?.length) {
          return <Fragment>{renderChildren()}</Fragment>;
        }
      }
    };

    if (!node) return null;
    if (node.hidden) return null;
    return (
      <ErrorBoundary FallbackComponent={null}>
        {React.createElement(
          TreeNodeContext.Provider,
          { value: node },
          renderComponent()
        )}
      </ErrorBoundary>
    );
  }
);

export const ComponentTreeWidgetInner: React.FC<IComponentTreeWidgetProps> =
  observer((props: IComponentTreeWidgetProps) => {
    const tree = useTree();

    const designer = useDesigner();
    const dataId = {};
    if (designer && tree) {
      // data-designer-node-id
      dataId[designer?.props?.nodeIdAttrName] = tree.id;
    }
    useEffect(() => {
      // 手动全局注册Behavior
      GlobalRegistry.registerDesignerBehaviors(props.components);
    }, []);
    return (
      <ErrorBoundary FallbackComponent={null}>
        <div
          style={{ ...props.style, ...tree?.props?.style }}
          className={cn(
            "componentTreeWidget",
            css`
              height: 100%;
              width: 100%;
              overflow: hidden;
            `
          )}
          {...dataId}
        >
          <DesignerComponentsContext.Provider value={props.components}>
            <TreeNodeWidget node={tree} />
          </DesignerComponentsContext.Provider>
        </div>
      </ErrorBoundary>
    );
  });

const ComponentTreeWidget = observer((props: IComponentTreeWidgetProps) => {
  const form = useMemo(() => {
    return createForm({
      designable: true,
    });
  }, []);
  const { designWidth = 1920, designHeight = 1080 } = useTreeRootProps();
  return (
    <SchemaComponentOptions
      components={props.components}
      scope={{
        colWidth: designWidth / 12,
        rowHeight: designHeight / 12,
      }}
    >
      <ComponentTreeWidgetInner {...props} />
    </SchemaComponentOptions>
  );
});

export default ComponentTreeWidget;
