import { css } from "@emotion/css";
import { observer } from "@formily/react";
import React, { useState } from "react";
import { isFn } from "@formily/shared";
import { useDesigner } from "../../hooks";
import type { IResource, IResourceLike } from "@/designable/core";
import { TreeNode, isResourceHost, isResourceList } from "@/designable/core";

export type SourceMapper = (resource: IResource) => React.ReactChild;

export interface IResourceWidgetProps {
  title: React.ReactNode;
  sources?: IResourceLike[];
  className?: string;
  defaultExpand?: boolean;
  children?: SourceMapper | React.ReactElement;
}

export const ResourceWidget = observer((props: IResourceWidgetProps) => {
  const [expand, setExpand] = useState(props.defaultExpand);
  const designer = useDesigner();
  const renderNode = (source: IResource) => {
    const { node, icon, title, thumb, span } = source;
    return (
      <div
        className={css`
          min-height: 40px;
          border: 1px solid red;
        `}
        style={{ gridColumnStart: `span ${span || 1}` }}
        key={node.id}
        data-designer-source-id={node.id}
      >
        {thumb && <img src={thumb} />}

        <span>{title}</span>
      </div>
    );
  };
  const sources = props.sources.reduce<IResource[]>((buf, source) => {
    if (isResourceList(source)) {
      return buf.concat(source);
    } else if (isResourceHost(source)) {
      return buf.concat(source.Resource);
    }
    return buf;
  }, []);
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(3, 33.3333%);
        grid-gap: 1px;
        background-color: var(--dn-panel-border-color);
        border-bottom: 1px solid var(--dn-panel-border-color);
      `}
    >
      {sources.map(isFn(props.children) ? props.children : renderNode)}
    </div>
  );
});
