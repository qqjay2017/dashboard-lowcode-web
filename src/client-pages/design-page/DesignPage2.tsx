import { get } from "lodash-es";

import { ExpressionScope, SchemaOptionsContext } from "@formily/react";
import { useDashboardDt } from "./useDashboardDt";
import { DesignEngine } from "./DesignEngine";

import {
  useAsyncProjectDataSource,
  useAsyncQuarterDataSource,
  useProjectSelectScope,
  useSchemaOptionsContext,
} from "@/schema-component";
import { useAppSpin } from "@/application";

function DesignPage2() {
  const { data, isLoading } = useDashboardDt();
  const schema = get(data, "data.data.content", "");
  const shareURL = get(data, "data.data.shareURL", "");
  const projectSelectScope = useProjectSelectScope();
  const { scope, ...schemaOptions } = useSchemaOptionsContext();
  const { render } = useAppSpin();

  if (!schema || isLoading || !projectSelectScope) {
    return render();
  }
  return (
    <SchemaOptionsContext.Provider
      value={{
        ...schemaOptions,
        scope: {
          ...scope,
          ...projectSelectScope,
          useAsyncProjectDataSource,
          useAsyncQuarterDataSource,
          dashboardDt: get(data, "data.data", {}) || {},
        },
      }}
    >
      <DesignEngine schema={schema} shareURL={shareURL} />
    </SchemaOptionsContext.Provider>
  );
}

export default DesignPage2;
