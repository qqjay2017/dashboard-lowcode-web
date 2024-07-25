import { observer } from '@formily/react'
import { createBehavior } from '@designable/core'
import { css } from '@emotion/css'
import { DashboardRootPreview } from '../DashboardRoot/components'
import type { DnFC } from '@/Designer/react/types'
import { AllLocales } from '@/schema-component/antd'

const designZoom = 0.5
export const DashboardRoot: DnFC<React.ComponentProps<typeof DashboardRootPreview>> = observer(
  ({ designWidth = 1920, designHeight = 1080, children, ...props }) => {
    return (
      <div
        className={css`
        overflow: hidden;
        box-shadow: 0 8px 10px #1e1e1e1f;
        width: ${designWidth * designZoom}px;
        height: ${designHeight * designZoom}px;
      
      `}
      >
        <DashboardRootPreview
          {...props}
          designWidth={designWidth}
          designHeight={designHeight}
        >
          {children}
        </DashboardRootPreview>
      </div>

    )
  },
)

DashboardRoot.Behavior = createBehavior({
  name: 'DashboardRoot',
  selector: node => node.componentName === 'DashboardRoot',
  designerProps(node) {
    return {
      draggable: false,
      cloneable: false,
      deletable: false,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: {
          labelCol: {
            'type': 'number',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
        },
      },
      defaultProps: {
        labelCol: 6,
        cols: 12,
        rows: 12,
        rowheight: 80,
        designWidth: 1920,
        designHeight: 1080,
        breakpoints: {
          showroom: 2600,
          desktop: 1300,
          tablet: 500,
          mobile: 0,
        },
        themeProvider: 'technologyBlue',
        isDarkTheme: true,

      },
    }
  },
  designerLocales: AllLocales.DashboardRoot,
})

// DashboardRoot.Resource = createResource({
//   title: { 'zh-CN': '大屏容器', 'en-US': 'DashboardRoot' },
//   icon: 'FormLayoutSource',
//   elements: [
//     {
//       componentName: 'Field',
//       props: {
//         'type': 'object',
//         'x-component': 'Form',
//       },
//     },
//   ],
// })
