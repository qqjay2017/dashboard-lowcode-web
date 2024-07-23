import type { ISchema } from "@formily/react";
import { dashboardRootFormSchema } from "@/schema-component";

export const allComponentTypeSettingSchema: Record<string, ISchema> = {
  DashboardRoot: dashboardRootFormSchema,
};
