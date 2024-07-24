import type { ISchema, SchemaKey } from '@formily/react'
import { RecursionField, Schema, SchemaOptionsContext } from '@formily/react'
import React, { useContext } from 'react'
import { ConfigProvider } from 'antd'
import type { JSXComponent } from '../types'
import { SchemaComponentOptions } from './SchemaComponentOptions'

export interface ISchemaFieldProps {
  schema?: ISchema
  components?: {
    [key: string]: JSXComponent
  }
  scope?: any
  name?: SchemaKey
  children?: React.ReactNode
}

export function SchemaField2(props: ISchemaFieldProps) {
  const schema = Schema.isSchemaInstance(props.schema)
    ? props.schema
    : new Schema({
      type: 'object',
      ...props.schema,
    })
  const renderChildren = () => {
    return <RecursionField {...props} schema={schema} />
  }
  const { locale } = useContext(ConfigProvider.ConfigContext)

  const options = useContext(SchemaOptionsContext)

  return (
    <SchemaComponentOptions
      inherit
      scope={{
        ...options?.scope,
        ...props.scope,
      }}
      components={{
        ...options?.components,
        ...props.components,
      }}
    >
      <ConfigProvider locale={locale}>{renderChildren()}</ConfigProvider>
    </SchemaComponentOptions>
  )
}
