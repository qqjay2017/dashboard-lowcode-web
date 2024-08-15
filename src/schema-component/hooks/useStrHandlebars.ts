import { useMemo } from "react";
import Handlebars from "handlebars";

import { useDashboardDt } from "@/client-pages/pages/dashboard/useDashboardDt";

export function useStrHandlebars(titleStr = "") {
  const { data: dashboardDt } = useDashboardDt();

  const str = useMemo(() => {
    const template = Handlebars.compile(titleStr);
    return template({
      dashboardDt: dashboardDt || {},
    });
  }, [titleStr, dashboardDt]);

  return str;
}
