import { GlobalRegistry, createDesigner, createResource } from '@designable/core'
import { CompositePanel, CompositePanelItem, Designer, DesignerToolsWidget, HistoryWidget, OutlineTreeWidget, ResourceWidget, StudioPanel, ToolbarPanel, ViewPanel, ViewToolsWidget, ViewportPanel, Workbench, WorkspacePanel } from './react/lib'
import { Content } from './content'

const Input = createResource({
  title: {
    'zh-CN': '输入框',
    'en-US': 'Input',
    'ko-KR': '입력 상자',
  },
  icon: 'InputSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        'title': '输入框',
        'type': 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  ],
})

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Displays: '展示控件',
      Feedbacks: '反馈控件',
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

const engine = createDesigner()

function Main() {
  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel>
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
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel>
              <ViewPanel type="JSONTREE">
                {() => {
                  return (
                    <div style={{ overflow: 'hidden', height: '100%' }}>
                      MonacoInput
                      {/* <MonacoInput
                        language="javascript"
                        helpCode="//hello world"
                        defaultValue={`<div><div>123123<div>123123<div>123123<div>123123</div></div></div></div></div>`}
                      /> */}
                    </div>
                  )
                }}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>

        </StudioPanel>
      </Workbench>
    </Designer>
  )
}

export default Main
