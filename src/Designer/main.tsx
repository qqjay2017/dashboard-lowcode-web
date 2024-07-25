import { createDesigner, createResource } from '@designable/core'
import { CompositePanel, CompositePanelItem, Designer, ResourceWidget, StudioPanel, Workbench } from './react/lib'

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

          </CompositePanel>

        </StudioPanel>
      </Workbench>
    </Designer>
  )
}

export default Main
