import type { AxiosRequestConfig } from "axios";
import { useAPIClient } from "./useAPIClient";
import { apiBase } from "@/utils";

export function useReqApiProxy() {
  const apiClient = useAPIClient();
  const request = async ({
    apiId,
    data = {},
    headers = {},
    formValues,
    dataPath,
    ...rest
  }: {
    apiId: string;
    data?: any;
    headers?: any;
    formValues?: any;
    dataPath?: string;
    transformResponse?: AxiosRequestConfig["transformResponse"];
  }) => {
    return apiClient?.request({
      dataPath,
      method: "post",
      url: apiId
        ? `${apiBase}/api-proxy/proxy`
        : `${apiBase}/api-proxy/proxy-test`,
      data: {
        formValues,
        apiId,
        data,
        origin: location.origin,
        headers,
      },

      ...rest,
    });
  };
  return {
    request,
  };
}
