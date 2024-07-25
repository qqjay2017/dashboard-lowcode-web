import type React from 'react'
import { Input as FormilyInput } from '@formily/antd-v5'
import { createBehavior, createResource } from '@designable/core'

import { observer } from '@formily/react'
import { get, set } from 'lodash-es'

import { AllLocales } from '../locales'
import type { DnFC } from '@/Designer/react/lib'
import { PositionDecoratorPreview } from '@/schema-component'

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>>
  = observer((props) => {
    const decoratorProps = props['x-decorator-props'] || {}
    const nodeId = props['data-designer-node-id'] || ''
    const style = props.style
    console.log(props, 'props')
    return (
      <PositionDecoratorPreview {...decoratorProps} nodeId={nodeId} style={style}>
        <div style={{
          width: '100%',
          height: '100%',
          border: '1px solid red',
        }}
        >
          <FormilyInput value="123" />
        </div>
      </PositionDecoratorPreview>
    )
  })

Input.Behavior = createBehavior(
  {
    name: 'Input',
    // extends: ['Field'],

    selector: node => node.props['x-component'] === 'Input',
    designerProps: {
      // propsSchema: createFieldSchema(AllSchemas.Input),
      resizable: {
        width(node, element) {
          const width = Number(
            get(node, 'props.style.width') ?? element.getBoundingClientRect().width,
          )
          console.log(node, width, 'node add width ')
          return {
            plus: () => {
              set(node, 'props.style.width', width + 10)
              // node.props = node.props || {}
              // node.props.style = node.props.style || {}
              // node.props.style.width = width + 10
            },
            minus: () => {
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
        componentName: 'Input',
        props: {
          'type': 'string',
          'title': 'Input',
          'x-decorator': 'PositionDecorator',
          'x-decorator-props': {
            style: {},
            padding: [16, 16, 16, 16],
            w: 3,
            h: 3,
            x: 6,
            y: 6,
          },
          'x-component': 'Input',
        },
      },
    ],
  },

)
