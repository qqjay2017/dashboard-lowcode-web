import type React from 'react'
import { Input as FormilyInput } from '@formily/antd-v5'
import { createBehavior, createResource } from '@designable/core'

import { observer } from '@formily/react'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../schemas'
import { AllLocales } from '../locales'
import type { DnFC } from '@/Designer/react/lib'

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>>
  = observer((props) => {
    return (
      <div style={{
        width: '100px',
        height: '100px',
        border: '1px solid red',
      }}
      >
        <FormilyInput {...props} />
      </div>
    )
  })

Input.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: node => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input),
      resizable: {
        width(node, element) {
          const width = Number(
            node.props?.style?.width ?? element.getBoundingClientRect().width,
          )

          return {
            plus: () => {
              node.props = node.props || {}
              node.props.style = node.props.style || {}
              node.props.style.width = width + 10
            },
            minus: () => {
              debugger
              node.props = node.props || {}
              node.props.style = node.props.style || {}
              node.props.style.width = width - 10
            },
          }
        },
        height(node, element) {
          const height = Number(
            node.props?.style?.height ?? element.getBoundingClientRect().height,
          )
          return {
            plus: () => {
              node.props = node.props || {}
              node.props.style = node.props.style || {}
              node.props.style.height = height + 10
            },
            minus: () => {
              node.props = node.props || {}
              node.props.style = node.props.style || {}
              node.props.style.height = height - 10
            },
          }
        },
      },
      translatable: {
        x(node, element, diffX) {
          const left
            = Number.parseInt(node.props?.style?.left ?? element?.style.left) || 0
          const rect = element.getBoundingClientRect()
          return {
            translate: () => {
              node.props = node.props || {}
              node.props.style = node.props.style || {}
              node.props.style.position = 'absolute'
              node.props.style.width = rect.width
              node.props.style.height = rect.height
              node.props.style.left = `${left + Number.parseInt(String(diffX))}px`
            },
          }
        },
        y(node, element, diffY) {
          const top = Number.parseInt(node.props?.style?.top ?? element?.style.top) || 0
          const rect = element.getBoundingClientRect()
          return {
            translate: () => {
              console.log(node, 'node')
              node.props = node.props || {}
              node.props.style = node.props.style || {}
              node.props.style.position = 'absolute'
              node.props.style.width = rect.width
              node.props.style.height = rect.height
              node.props.style.top = `${top + Number.parseInt(String(diffY))}px`
            },
          }
        },
      },
    },
    designerLocales: AllLocales.Input,
  },

)

Input.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          'type': 'string',
          'title': 'Input',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  },

)
