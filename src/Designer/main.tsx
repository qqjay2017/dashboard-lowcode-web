import { GlobalRegistry, createDesigner, createResource } from '@designable/core'
import { CompositePanel, CompositePanelItem, Designer, ResourceWidget, StudioPanel, Workbench } from './react/lib'
import { OutlineTreeWidget } from './react/widgets/OutlineWidget'

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
          </CompositePanel>

        </StudioPanel>
      </Workbench>
    </Designer>
  )
}

export default Main
