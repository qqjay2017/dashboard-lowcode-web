import { useQueryToBusParams } from "../useQueryToBusParams";
import { useRequest } from "@/api-client";
import { apiConfig, apiUrlMap, systemIds } from "@/schema-component/shared";

export function useWagonQuery(
  {
    type = 0,
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
      staleTime: 5 * 6000,
      method: "POST",
      refreshDeps: [type],
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
