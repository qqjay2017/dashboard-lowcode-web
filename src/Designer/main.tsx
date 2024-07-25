import { GlobalRegistry, ScreenType, createBehavior, createDesigner, createResource } from '@designable/core'
import { Button, Space } from 'antd'
import { observer } from '@formily/react'

import {
  transformToSchema,

} from '@designable/formily-transformer'
import { useMemo } from 'react'
import { ComponentTreeWidget, CompositePanel, CompositePanelItem, Designer, DesignerToolsWidget, HistoryWidget, OutlineTreeWidget, ResourceWidget, SettingsPanel, StudioPanel, ToolbarPanel, ViewPanel, ViewToolsWidget, ViewportPanel, Workbench, Workspace, WorkspacePanel, useDesigner } from './react/lib'

import { SettingsForm } from './react-settings-form'
import { Input } from '@/schema-component/antd/Input'
import { Field } from '@/schema-component/antd'
import { DashboardRoot } from '@/schema-component/components/DashboardRoot2'
import { PositionDecoratorPreview } from '@/schema-component'

// import { MonacoInput } from './react-settings-form/MonacoInput'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Displays: '展示控件',
      Feedbacks: '反馈控件',

      Layouts: '布局组件',
      Arrays: '自增组件',

    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Displays: 'Displays',
      Feedbacks: 'Feedbacks',
    },
  },
  'ko-KR': {
    sources: {
      Inputs: '입력',
      Displays: '디스플레이',
      Feedbacks: '피드백',
    },
  },
})

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
    大屏设计器
  </div>
)
const Actions = observer(() => {
  const designer = useDesigner()
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr']
  // useEffect(() => {
  //   if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
  //     GlobalRegistry.setDesignerLanguage('zh-cn')
  //   }
  // }, [])

  const saveSchema = (designer) => {
    const tree = designer.getCurrentTree()

    const schema = transformToSchema(tree, {
      designableFieldName: 'Field',
      designableFormName: 'DashboardRoot',
    })

    console.log({
      tree,
      schema,
    })
  }

  return (
    <Space style={{ marginRight: 10 }}>
      {/* <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
          { label: '한국어', value: 'ko-kr' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      /> */}

      <Button onClick={() => {
        saveSchema(designer)
      }}
      >
        保存
      </Button>
      <Button type="primary">发布</Button>
    </Space>
  )
})

function Main() {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          // new Shortcut({
          //   codes: [
          //     [KeyCode.Meta, KeyCode.S],
          //     [KeyCode.Control, KeyCode.S],
          //   ],
          //   handler(ctx) {
          //     saveSchema(ctx.engine)
          //   },
          // }),
        ],
        rootComponentName: 'DashboardRoot',
        defaultScreenType: ScreenType.Responsive,

      }),
    [],
  )
  return (
    <Designer engine={engine}>

      <StudioPanel logo={<Logo />} actions={<Actions />}>
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" sources={[Input]} />
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>
        <Workspace id="dashboardRoot">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      DashboardRoot,
                      Field,
                      Input,

                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE">
                {() => {
                  return (
                    <div style={{ overflow: 'hidden', height: '100%' }}>
                      MonacoInput
                      {/* <MonacoInput
                        language="javascript"
                        helpCode="//hello world"
                        defaultValue="<div><div>123123<div>123123<div>123123<div>123123</div></div></div></div></div>"
                      /> */}
                    </div>
                  )
                }}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>

    </Designer>
  )
}

export default Main
