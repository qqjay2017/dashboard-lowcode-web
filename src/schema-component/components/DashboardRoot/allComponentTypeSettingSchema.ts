import type { ISchema } from '@formily/react'

import getDashboardRootFormSchema from '@/schema-component/utils/schema/dashboardRootForm'

export const allComponentTypeSettingSchema: Record<string, ISchema> = {
  DashboardRoot: getDashboardRootFormSchema(),
}
