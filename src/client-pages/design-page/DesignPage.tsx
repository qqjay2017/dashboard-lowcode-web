import { get } from "lodash-es";

import { useDashboardDt } from "./useDashboardDt";

import { useAppSpin } from "@/application";
import {
  SchemaField2,
  useAsyncProjectDataSource,
  useAsyncQuarterDataSource,
  useProjectSelectScope,
} from "@/schema-component";

export const DesignPage = () => {
  const { render } = useAppSpin();

  const { data, isLoading } = useDashboardDt();
  const schema = get(data, "data.data.content", "");
  const projectSelectScope = useProjectSelectScope();
  if (!schema || isLoading || !projectSelectScope) {
    return render();
  }

  return (
    <SchemaField2
      scope={{
        ...projectSelectScope,
        useAsyncProjectDataSource,
        useAsyncQuarterDataSource,
        dashboardDt: get(data, "data.data", {}) || {},
      }}
      schema={JSON.parse(schema)}
    />
  );
};
