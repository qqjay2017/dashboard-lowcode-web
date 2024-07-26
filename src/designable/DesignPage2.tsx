import React, { useMemo } from "react";
import { Designer, Workbench } from "./react/container";
import {
  GlobalRegistry,
  createBehavior,
  createDesigner,
  createResource,
} from "./core";
import {
  CompositePanel,
  StudioPanel,
  ViewportPanel,
  WorkspacePanel,
} from "./react/panels";
import { ViewPanel } from "./react/panels/ViewPanel";
import { Content } from "./Content";
import { ResourceWidget } from "./react/widgets";

/**
 * 存到全局缓存
 */
const Card = createResource({
  title: "卡片",
  icon: "CardSource",
  elements: [
    {
      componentName: "Card",
      props: {
        title: "卡片",
      },
    },
  ],
});

export function DesignPage2() {
  const engine = useMemo(() => {
    return createDesigner({});
  }, []);
  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel>
          <CompositePanel>
            <ResourceWidget title="sources.Inputs" sources={[Card]} />
          </CompositePanel>
          <WorkspacePanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  );
}
