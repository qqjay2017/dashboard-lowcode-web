import { createLocales } from 'designablecore'
import { Component } from './Component'

export const DashboardRoot = createLocales(Component, {
  'zh-CN': {
    title: '大屏容器',
    settings: {
      labelCol: '标签网格宽度',

    },
  },
  'en-US': {
    title: 'Form',
    settings: {
      labelCol: 'Label Col',

    },
  },
  'ko-KR': {

  },
})
