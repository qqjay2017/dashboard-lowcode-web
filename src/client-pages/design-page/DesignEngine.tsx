import { useEffect, useMemo } from "react";
import { FormProvider } from "@formily/react";
import { createForm } from "@formily/core";
import { Actions, Logo } from "./Logo";
import {
  FormilyAiotMonitorBlock as AiotMonitorBlock,
  FormilyChartTemplate as ChartTemplate,
  FormilyClassicFrame as ClassicFrame,
  FormilyClassicFrame5 as ClassicFrame5,
  FormilyClassicFrame6 as ClassicFrame6,
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
  FormilySmartHelmet as SmartHelmet,
  FormilyUnprocessedWarningList as UnprocessedWarningList,
} from "@/schema-component/widgets";

import {
  FormilyDeviationOfCargo as DeviationOfCargo,
  FormilyWeighbridge as Weighbridge,
  FormilyWeightDeviationTrend as WeightDeviationTrend,
} from "@/schema-component/widgets/zhdg";

import {
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  Workbench,
  WorkspacePanel,
} from "@/designable/react";

import { createDesigner, createResource } from "@/designable/core";

import { SettingsForm } from "@/designable/react-settings-form/SettingsForm";
import ViewToolsWidget from "@/designable/react/widgets/ViewToolsWidget";
import { getAllQueryKeys } from "@/schema-component/shared";
import { transformToTreeNode } from "@/designable/transformer";
import Root from "@/schema-component/core/Root";
import PositionDecorator from "@/schema-component/core/PositionDecorator";
import Field from "@/schema-component/core/Field";
import DesignerViewportPanel from "@/designable/react/panels/DesignerViewportPanel";
import ComponentTreeWidget from "@/designable/react/widgets/ComponentTreeWidget";

export function DesignEngine({
  schema,
  shareURL,
  name,
  chartAll = [],
}: {
  name?: string;
  schema?: any;
  shareURL?: string;
  chartAll?: any[];
}) {
  const form = useMemo(() => {
    return createForm({
      designable: true,
    });
  }, [schema]);
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
    <FormProvider form={form}>
      <Designer engine={engine}>
        <Workbench>
          <StudioPanel
            logo={<Logo name={name} />}
            actions={<Actions shareURL={shareURL} />}
          >
            <CompositePanel>
              <CompositePanel.Item title="组件" icon="Component">
                <ResourceWidget
                  title="导航菜单"
                  sources={[Header1, Header5, HeaderMenu]}
                />
                <ResourceWidget
                  title="装饰边框"
                  sources={[ClassicFrame, ClassicFrame5, ClassicFrame6]}
                />
                <ResourceWidget
                  title="全局查询"
                  sources={[ProjectSelect, QuarterSelect]}
                />
                <ResourceWidget
                  defaultExpand={false}
                  title="图表"
                  sources={chartAll.map((chart) => {
                    return createResource({
                      title: chart.name,

                      icon: chart.coverThumbnail,
                      elements: [
                        {
                          componentName: "Field",

                          componentDisplayName: chart.name,
                          props: {
                            type: "void",
                            "x-component": "ChartTemplate",
                            "x-component-props": {
                              queryKeys: getAllQueryKeys(),
                              chartId: String(chart.id),
                              busData: {},
                            },
                            "x-decorator": "PositionDecorator",
                            "x-decorator-props": {
                              padding: "0px 0px 0px 0px",
                              w: 3,
                              h: 3,
                            },
                          },
                        },
                      ],
                    });
                  })}
                />
                <ResourceWidget
                  defaultExpand={false}
                  title="智慧工地"
                  sources={[
                    Weighbridge,
                    DeviationOfCargo,
                    WeightDeviationTrend,
                  ]}
                />
                <ResourceWidget
                  defaultExpand={false}
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
                <ResourceWidget
                  defaultExpand={false}
                  title="业务-项目信息"
                  sources={[ProjectDesc]}
                />
                <ResourceWidget
                  defaultExpand={false}
                  title="业务-企业级驾驶舱"
                  sources={[AiotMonitorBlock, ProjectBudget]}
                />
              </CompositePanel.Item>
            </CompositePanel>
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget use={["DESIGNABLE", "JSONTREE"]} />
              </ToolbarPanel>
              <DesignerViewportPanel>
                <ComponentTreeWidget
                  components={{
                    Root,
                    LaborAttendance,
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
                    PositionDecorator,
                    Weighbridge,
                    DeviationOfCargo,
                    ClassicFrame6,
                    WeightDeviationTrend,
                  }}
                />
              </DesignerViewportPanel>
            </WorkspacePanel>
            <SettingsPanel title="属性配置">
              <SettingsForm />
            </SettingsPanel>
          </StudioPanel>
        </Workbench>
      </Designer>
    </FormProvider>
  );
}
