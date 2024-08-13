import { get } from "lodash-es";
import { useMemo } from "react";
import type { DataSourceBindType } from "../types";
import { takeFirstApiInfo } from "../shared";
import { functionTemplateHandle } from "../widgets";
import { useQuery, useReqApiProxy } from "@/api-client";

/**
 * TODO  数据源执行处理
 * @param dataSource
 * @returns
 */
export function useDataBindFetch(
  apiInfo: DataSourceBindType | DataSourceBindType[],
  requestData?: any,
  callback?: Function
) {
  const dataSource = takeFirstApiInfo(apiInfo);
  const { request } = useReqApiProxy();
  const _requestData = {
    ...functionTemplateHandle(dataSource?.busData, {}),
    ...requestData,
  };

  const { data, ...rest } = useQuery({
    queryKey: [
      "dataSourceQuery",
      JSON.stringify(_requestData || {}),
      JSON.stringify(dataSource),
    ],
    staleTime: 5 * 6000,
    enabled: !!dataSource?.dataSourceId,
    queryFn: async () => {
      let apiRes;
      if (request) {
        apiRes = await request({
          // 指定数据的层级
          dataPath:
            dataSource?.dataSourceType === "json" ||
            dataSource?.dataSourceType === "js"
              ? "data"
              : "data.data",
          data: _requestData,
          apiId: dataSource?.dataSourceId,
        });
      }
      try {
        callback && callback(apiRes);
      } catch (error) {
        return apiRes;
      }
      return apiRes;
    },
  });

  return {
    ...rest,
    data,
  };
}
