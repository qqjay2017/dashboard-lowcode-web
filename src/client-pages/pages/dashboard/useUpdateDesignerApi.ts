import type { DashboardItem } from "./types";

import { useUpdateDashboard } from "@/schema-component/hooks";
import { apiBase } from "@/utils";

export function useUpdateDesignerApi() {
  const { updateDashboard } = useUpdateDashboard();

  return async (dto?: Partial<DashboardItem>) => {
    return await updateDashboard(dto, dto.id);
  };
}
