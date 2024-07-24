import { css } from '@emotion/css'

import type { IDesignComponentSettingConfigProps } from './DesignComponentSettingCode'
import {
  DesignComponentSettingCode,
  DesignComponentSettingConfig,
} from './DesignComponentSettingCode'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui'
import { isRootAddress } from '@/utils'

export function DesignComponentSetting(props: IDesignComponentSettingConfigProps) {
  const isRoot = isRootAddress(props.address)
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <Tabs
        defaultValue="config"
        className={css`
          width: 100%;
          height: 100%;
        `}
      >
        {isRoot
          ? (
              <TabsList
                className={css`
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              width: 100%;
              height: 32px;
              background-color: rgb(39, 39, 42);
            `}
              >
                <TabsTrigger
                  value="config"
                  className={css`
                font-size: 14px;
                line-height: 16px;
              `}
                >
                  页面配置
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={css`
                font-size: 14px;
                line-height: 16px;
              `}
                >
                  代码编辑
                </TabsTrigger>
              </TabsList>
            )
          : (
              <TabsList
                className={css`
              display: grid;
              grid-template-columns: repeat(1, minmax(0, 1fr));
              width: 100%;
              height: 32px;
              background-color: rgb(39, 39, 42);
            `}
              >
                <TabsTrigger value="config">页面配置</TabsTrigger>
              </TabsList>
            )}

        <TabsContent
          value="config"
          className={css`
            width: 100%;
            height: calc(100% - 32px);
          `}
        >
          <DesignComponentSettingConfig {...props} />
        </TabsContent>
        <TabsContent
          value="code"
          className={css`
            width: 100%;
            height: calc(100% - 32px);
          `}
        >
          <DesignComponentSettingCode {...props} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
