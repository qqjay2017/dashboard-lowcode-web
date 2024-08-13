/**
 * 方便二次加工
 */

import { useQuery } from "@tanstack/react-query";
import { useApp } from "@/application/hooks";

export { useQuery } from "@tanstack/react-query";

export interface UseRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
  data?: any;
  refreshDeps?: any[];
  headers?: any;
  enabled?: boolean;
  staleTime?: number;
  select?: any;
  placeholderData?: any;
}

export type APiWrap<T> = T;
// {
//   data: T
// }

export function useRequest<D = any>(
  url?: string,
  options: UseRequestOptions = { method: "GET" },
  callback?: Function
) {
  const app = useApp();
  const {
    method,
    params,
    data,
    refreshDeps = [],
    headers,
    enabled,
    staleTime = 2000,
    select,
    placeholderData,
    ...other
  } = options;

  return useQuery({
    queryKey: [url, method, ...refreshDeps],
    enabled,
    staleTime,
    select,
    placeholderData: placeholderData || select,
    queryFn: async () => {
      try {
        const res = await app.apiClient.request<any, D>({
          url,
          method,
          params,
          data,
          headers,

          ...other,
        });
        callback && callback(res);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
}
