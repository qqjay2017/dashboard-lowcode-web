import { clone, toArr, uid } from '@formily/shared'
import type { IDataSourceItem, INodeItem } from './types'

export interface INode {
  key?: string
  map?: any
  children?: INode[]
}

export function traverseTree<T extends INode>(data: T[], callback: (dataItem: T, i: number, data: T[]) => any) {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data)
    if (data[i]?.children) {
      traverseTree(data[i]?.children, callback)
    }
  }
}

export function transformValueToData(value: IDataSourceItem[]): INodeItem[] {
  const data = clone(value)
  traverseTree(data, (item, i, dataSource) => {
    const dataItem = {
      key: '',
      duplicateKey: '',
      map: [],
      children: [],
    }
    for (const [key, value] of Object.entries(dataSource[i] || {})) {
      if (key !== 'children')
        dataItem.map.push({ label: key, value })
    }
    const uuid = uid()
    dataItem.key = uuid
    dataItem.duplicateKey = uuid
    dataItem.children = dataSource[i].children || []
    dataSource[i] = dataItem
  })
  return data
}

export function transformDataToValue(data: INodeItem[]): IDataSourceItem[] {
  const value = clone(data)
  traverseTree(value, (item, i, dataSource) => {
    const valueItem: IDataSourceItem = {
      children: [],
    }
    toArr(dataSource[i].map).forEach((item) => {
      if (item.label)
        valueItem[item.label] = item.value
    })
    valueItem.children = dataSource[i]?.children || []
    dataSource[i] = valueItem
  })
  return value
}