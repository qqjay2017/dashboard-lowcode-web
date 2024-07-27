import { useEffect, useMemo } from "react";
import { get } from "lodash-es";

import { Actions } from "./Logo/Actions";
import { Logo } from "./Logo/Logo";
import { useDashboardDt } from "./useDashboardDt";
import { SettingsForm } from "@/designable/react-settings-form";
import {
  Designer,
  SettingsPanel,
  ViewPanel,
  Workbench,
} from "@/designable/react";
import { createDesigner, transformToTreeNode } from "@/designable/core";
import { Field } from "@/designable/Field";
import { Card } from "@/designable/Content";
import {
  CompositePanel,
  StudioPanel,
  ViewportPanel,
  WorkspacePanel,
} from "@/designable/react/panels";
import {
  ComponentTreeWidget,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
} from "@/designable/react/widgets";
import { Root } from "@/designable/Field/Root/Root";
import { Header1, useProjectSelectScope } from "@/schema-component";
import { useAppSpin } from "@/application";

function DesignPage2() {
  const { data, isLoading } = useDashboardDt();
  const schema = get(data, "data.data.content", "");
  const projectSelectScope = useProjectSelectScope();
  const engine = useMemo(() => {
    return createDesigner({});
  }, []);

  const { render } = useAppSpin();

  useEffect(() => {
    if (engine && schema) {
      const tree = transformToTreeNode(JSON.parse(schema));
      console.log(tree);
      engine.setCurrentTree(tree);
    }
  }, [engine, schema]);

  if (!schema || isLoading || !projectSelectScope) {
    return render();
  }
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

export default DesignPage2;
