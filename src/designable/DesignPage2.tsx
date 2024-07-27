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
import { Card } from "./Content";
import {
  ComponentTreeWidget,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
} from "./react/widgets";
import { Logo } from "./Logo/Logo";
import { Actions } from "./Logo/Actions";
import { Field } from "./Field";
import { SettingsPanel } from "./react/panels/SettingsPanel";
import { SettingsForm } from "./react-settings-form";
import { Root } from "@/schema-component/components/Root/Root";
import { Header1 } from "@/schema-component";

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
              <ResourceWidget title="业务" sources={[Card, Header1]} />
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
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Root,
                      Card,
                      Field,
                      Header1,
                    }}
                  />
                )}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="属性配置">
            <SettingsForm />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  );
}
