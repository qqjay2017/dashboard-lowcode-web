import type { DashboardItem } from "../pages/dashboard/types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client/hooks/useRequest";
import { apiBase } from "@/utils";

export function usePreviewDt(id = "") {
  return useRequest<APiWrap<DashboardItem>>(`${apiBase}/designer/${id}`, {
    method: "GET",
    refreshDeps: [id],
  });
}
