

import { observer } from '@formily/reactive-react'
import { ComponentTreeWidget, useTreeNode } from './react/lib'
import { Form ,Field} from '../schema-component/antd'



export const Content = () => (
  <ComponentTreeWidget
    
    components={{
      Form,
      DashboardRoot:()=>{
        return <div id='DashboardRoot'></div>
      },
      Field: observer((props) => {
        const node = useTreeNode()
        return (
          <span
            {...props}
            style={{
              background: '#eee',
              display: 'inline-block',
              ...props.style,
              padding: '10px 20px',
              border: '1px solid #ddd',
            }}
          >
            <span data-content-editable="title">fff{node.props.title}</span>
            {props.children}
          </span>
        )
      }),
      Card: observer((props) => {
        return (
          <div
            {...props}
            style={{
              width: 400,
              height: 400,
              ...props.style,
              background: '#eee',
              border: '1px solid #ddd',
              display: 'flex',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {props.children ? props.children : <span>拖拽组件进入该区域</span>}
          </div>
        )
      }),
    }}
  />
)
