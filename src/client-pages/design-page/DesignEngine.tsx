import { useEffect, useMemo } from "react";
import { Actions, Logo } from "./Logo";
import { Header1, Header5, HeaderMenu, Root } from "@/schema-component";
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ViewPanel,
  ViewportPanel,
  Workbench,
  WorkspacePanel,
} from "@/designable/react";
import { Card } from "@/designable/Content";
import { Field } from "@/designable/Field";
import { createDesigner, transformToTreeNode } from "@/designable/core";
import { SettingsForm } from "@/designable/react-settings-form";

export function DesignEngine({ schema }: { schema?: any }) {
  const engine = useMemo(() => {
    return createDesigner({
      defaultComponentTree: schema,
    });
  }, []);

  useEffect(() => {
    if (engine && schema) {
      const tree = transformToTreeNode(JSON.parse(schema));

      engine.setCurrentTree(tree);
    }
  }, [engine, schema]);

  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel logo={<Logo />} actions={<Actions />}>
          <CompositePanel>
            <CompositePanel.Item title="组件" icon="Component">
              <ResourceWidget
                title="导航菜单"
                sources={[Header1, Header5, HeaderMenu]}
              />
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

                      Field,
                      Header1,
                      Header5,
                      HeaderMenu,
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
