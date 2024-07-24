import React from "react";
import { useRequest } from "@/api-client";
import { apiBase } from "@/utils";

export const useFetchChartConfig = (chartId = "") => {
  return useRequest(`${apiBase}/chart/${chartId}`, {
    method: "GET",
    refreshDeps: [chartId],
    enabled: !!chartId,
  });
};
