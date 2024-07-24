import type { ISchema, Schema } from '@formily/react'
import { useFieldSchema, useForm } from '@formily/react'
import { useParams } from 'react-router-dom'
import { get, set } from 'lodash-es'
import { uid } from '@formily/shared'
import type { ElementsType } from '../components/DashboardRoot/components/ContentMenu'
import { useAPIClient } from '../../api-client'

import { allComponentTypInitSchema, useDashboardRoot } from '../components'
import {
  dispatchFieldSchemaChange,
  dispatchInsert,
} from '../components/DashboardRoot/utils'
import { useSchemaComponentContext } from './useSchemaComponentContext'
import { useUpdateDashboard } from './useUpdateDashboard'
import { apiBase, isRootAddress } from '@/utils'
import { useApp } from '@/application'

const replaceKeys = {
  'title': 'title',
  'description': 'description',
  'default': 'initialValue',
  'readOnly': 'readOnly',
  'writeOnly': 'editable',
  'enum': 'dataSource',
  'x-pattern': 'pattern',
  'x-display': 'display',
  'x-validator': 'validator',
  'x-decorator': 'decorator',
  'x-component': 'component',
  'x-reactions': 'reactions',
  'x-content': 'content',
  'x-visible': 'visible',
  'x-hidden': 'hidden',
  'x-disabled': 'disabled',
  'x-editable': 'editable',
  'x-read-only': 'readOnly',
  'x-decorator-props': 'decoratorProps',
  'x-component-props': 'componentProps',
}

export function useSaveAllFieldSchema() {
  const form = useForm()
  const fieldSchema = useFieldSchema()
  const { rootFieldSchema } = useDashboardRoot()
  const { updateDashboard } = useUpdateDashboard()
  const { reset } = useSchemaComponentContext()
  const saveLocalFieldState = ({
    address = '',
    schema = {},
    fieldSchema: _fieldSchema = rootFieldSchema,
  }: {
    address: string
    schema: ISchema
    fieldSchema?: ISchema
  }) => {
    form.setFieldState(address, (state) => {
      Object.keys(schema).forEach((k) => {
        if (!k) {
          return false
        }

        const val = schema[k]
        const replaceKey = replaceKeys[k] || k
        if (!state[replaceKey]) {
          state[replaceKey] = {}
        }
        if (val && replaceKey) {
          Object.keys(val).forEach((i) => {
            if (i) {
              state[replaceKey][i] = val[i]
            }
          })
        }

        const setAddressBefore = address
          .split('.')
          .map((key, index) => {
            if (index === 0) {
              return ''
            }
            else {
              return `properties.${key}`
            }
          })
          .filter(Boolean)
          .join('.')
        const setAddress = setAddressBefore ? `${setAddressBefore}.${k}` : k

        setAddress && set(_fieldSchema, setAddress, state[replaceKey])
      })
    })
  }

  const saveLocalFieldSchema = async ({
    address = '',
    schema = {},
    fieldSchema: _fieldSchema = rootFieldSchema,
  }: {
    address: string
    schema: any
    fieldSchema?: Schema
  }) => {
    if (isRootAddress(address)) {
      const allObj = {
        type: 'void',
        properties: {
          dashboardRoot: schema,
        },
      }

      await updateDashboard({
        content: JSON.stringify(allObj),
      })
      document.dispatchEvent(new CustomEvent('resetJson'))
      // reset && reset();
    }
    //  else {
    //   const setAddressBefore = address
    //     .split(".")
    //     .map((key, index) => {
    //       if (index === 0) {
    //         return "";
    //       } else {
    //         return `properties.${key}`;
    //       }
    //     })
    //     .filter(Boolean)
    //     .join(".");

    //   set(_fieldSchema, setAddressBefore, schema);
    //   const allObj = {
    //     type: "void",
    //     properties: {
    //       dashboardRoot: _fieldSchema,
    //     },
    //   };

    //   await updateDashboard({
    //     content: JSON.stringify(allObj),
    //   });

    //   // reset && reset();
    // }
  }

  const saveRemoteFieldSchema = async (schema?: Schema) => {
    await updateDashboard({
      content: JSON.stringify({
        type: 'void',
        properties: {
          dashboardRoot: (schema || fieldSchema).toJSON(),
        },
      }),
    })

    dispatchFieldSchemaChange()
  }
  return {
    saveRemoteFieldSchema,
    saveLocalFieldState,
    saveLocalFieldSchema,
  }
}

export function useInsertSchemaComponent() {
  const app = useApp()
  const { reset, refresh } = useSchemaComponentContext()
  const apiClient = useAPIClient()
  const initSchema = {
    ...Object.keys(app.components).reduce((memo, curKey) => {
      const cur = app.components[curKey]
      if (cur && cur.schemaFn) {
        memo[curKey] = cur.schemaFn
      }
      return memo
    }, {}),

    ...allComponentTypInitSchema,
  }

  const { id } = useParams()

  const fieldSchema = useFieldSchema()
  const saveRemoteFieldSchema = (schema?: Schema) => {
    return apiClient.request({
      url: `${apiBase}/dashboard/${id}`,
      method: 'put',
      data: {
        // id,
        content: JSON.stringify({
          type: 'void',
          properties: {
            dashboardRoot: (schema || fieldSchema).toJSON(),
          },
        }),
      },
    })
  }
  const insertSchemaComponent = ({
    address,
    type,
    position,
    componentProps,
  }: {
    componentProps?: any
    address: string
    type: ElementsType
    position: {
      x?: number
      y?: number
      zIndex?: number
    }
  }) => {
    if (!address || !type) {
      return false
    }

    const initFn = initSchema[type]
    if (!initFn) {
      return false
    }

    const newId = uid()

    // 添加儿子
    const curFieldSchema = address.includes('.')
      ? get(
        fieldSchema,
        address
          .split('.')
          .map((key, index) => {
            if (index === 0) {
              return ''
            }
            else {
              return `properties.${key}`
            }
          })
          .filter(Boolean)
          .join('.'),
      )
      : fieldSchema

    const initFnParams = {
      'x-decorator-props': {
        zIndex: 4,
        ...position,
      },
    }
    if (componentProps) {
      initFnParams['x-component-props'] = {
        ...(componentProps || {}),
      }
    }

    const s = initFn(initFnParams)

    curFieldSchema.addProperty(s.name || newId, s)
    saveRemoteFieldSchema().then(() => {
      refresh && refresh()
      dispatchInsert()
    })
  }
  return {
    saveRemoteFieldSchema,
    insertSchemaComponent,
    reset,
    refresh,
  }
}
