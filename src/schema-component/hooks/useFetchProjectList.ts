import React from "react";
import { apiConfig, apiUrlMap } from "../shared";
import { useRequest } from "@/api-client";
import { getCompanyId } from "@/utils";

export function useFetchProjectList({
  staleTime = true,
}: {
  staleTime?: boolean;
}) {
  return useRequest(`${apiConfig.apiProjectSystem}${apiUrlMap.projectTable}`, {
    method: "POST",
    headers: {
      "system-id": "1",
    },
    staleTime: staleTime ? 1000 * 60 * 5 : undefined,

    data: {
      authFlag: true,
      companyId: getCompanyId(),
      pageNum: 1,
      pageSize: 200,
    },
  });
}
