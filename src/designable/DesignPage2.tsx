import { useMemo } from "react";
import { Designer, Workbench } from "./react/container";
import { createDesigner } from "./core";
import {
  CompositePanel,
  StudioPanel,
  ViewportPanel,
  WorkspacePanel,
} from "./react/panels";
import { ViewPanel } from "./react/panels/ViewPanel";
import { Card, Content } from "./Content";
import {
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
} from "./react/widgets";
import { Logo } from "./Logo/Logo";
import { Actions } from "./Logo/Actions";

export function DesignPage2() {
  const engine = useMemo(() => {
    return createDesigner({});
  }, []);
  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel logo={<Logo />} actions={<Actions />}>
          <CompositePanel>
            <CompositePanel.Item title="组件" icon="Component">
              <ResourceWidget title="sources.Inputs" sources={[Card]} />
            </CompositePanel.Item>
            <CompositePanel.Item title="大纲树" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title="历史记录" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
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
