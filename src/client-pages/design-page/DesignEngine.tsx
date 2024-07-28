import { useEffect, useMemo } from "react";
import { Actions, Logo } from "./Logo";
import {
  FormilyAiotMonitorBlock as AiotMonitorBlock,
  FormilyChartTemplate as ChartTemplate,
  FormilyClassicFrame as ClassicFrame,
  FormilyClassicFrame5 as ClassicFrame5,
  FormilyEmploymentCreditMng as EmploymentCreditMng,
  FormilyHeader1 as Header1,
  FormilyHeader5 as Header5,
  FormilyHeaderMenu as HeaderMenu,
  FormilyKeyPersonArrived as KeyPersonArrived,
  FormilyLaborAttendance as LaborAttendance,
  FormilyProjectAttendanceAnaTable as ProjectAttendanceAnaTable,
  FormilyProjectAttendanceDataAna as ProjectAttendanceDataAna,
  FormilyProjectBudget as ProjectBudget,
  FormilyProjectDesc as ProjectDesc,
  FormilyProjectSelect as ProjectSelect,
  FormilyQuarterSelect as QuarterSelect,
  Root,
  FormilySmartHelmet as SmartHelmet,
  FormilyUnprocessedWarningList as UnprocessedWarningList,
} from "@/schema-component";
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

import { Field } from "@/designable/Field";
import { createDesigner, transformToTreeNode } from "@/designable/core";
import { SettingsForm } from "@/designable/react-settings-form";

export function DesignEngine({
  schema,
  shareURL,
}: {
  schema?: any;
  shareURL?: string;
}) {
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
        <StudioPanel logo={<Logo />} actions={<Actions shareURL={shareURL} />}>
          <CompositePanel>
            <CompositePanel.Item title="组件" icon="Component">
              <ResourceWidget
                title="导航菜单"
                sources={[Header1, Header5, HeaderMenu]}
              />
              <ResourceWidget
                title="装饰边框"
                sources={[ClassicFrame, ClassicFrame5]}
              />
              <ResourceWidget
                title="全局查询"
                sources={[ProjectSelect, QuarterSelect]}
              />
              <ResourceWidget
                title="业务-人员信息"
                sources={[
                  LaborAttendance,
                  EmploymentCreditMng,
                  KeyPersonArrived,
                  ProjectAttendanceAnaTable,
                  ProjectAttendanceDataAna,
                  SmartHelmet,
                  UnprocessedWarningList,
                ]}
              />
              <ResourceWidget title="业务-项目信息" sources={[ProjectDesc]} />
              <ResourceWidget
                title="业务-企业级驾驶舱"
                sources={[AiotMonitorBlock, ProjectBudget]}
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
                      ProjectDesc,
                      AiotMonitorBlock,
                      EmploymentCreditMng,
                      KeyPersonArrived,
                      ProjectAttendanceAnaTable,
                      ProjectAttendanceDataAna,
                      ProjectBudget,
                      SmartHelmet,
                      ClassicFrame,
                      ClassicFrame5,
                      ProjectSelect,
                      QuarterSelect,
                      ChartTemplate,
                      UnprocessedWarningList,
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
