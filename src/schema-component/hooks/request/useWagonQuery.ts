import { useQueryToBusParams } from "../useQueryToBusParams";
import { useRequest } from "@/api-client";
import { apiConfig, apiUrlMap, systemIds } from "@/schema-component/shared";

export function useWagonQuery(
  {
    type = 0,
    ...other
  }: {
    /**
     *  搜索类型 0-货物 1-发货单位
     */
    type?: number;
  },
  callback?: Function
) {
  const busParams = useQueryToBusParams();
  return useRequest<{
    rows: { name?: string | null }[];
  }>(
    `${apiConfig.apiIot}${apiUrlMap.wagonQuery}`,
    {
      staleTime: 2000,
      method: "POST",
      refreshDeps: [type, other],
      data: {
        ...busParams,
        type,
        pageNum: 1,
        pageSize: 100,
      },
      headers: {
        "system-id": systemIds.zhgd,
      },
    },
    callback
  );
}
