import { useContext } from "react";

import { RecursionField, SchemaOptionsContext } from "@formily/react";
import { get } from "lodash-es";
import { Helmet } from "react-helmet";
import type { APiWrap } from "../../api-client";
import { useRequest } from "../../api-client";
import type { DashboardItem } from "../dashboard/types";
import { RecursionSchemaComponentWrap } from "../../schema-component/core";
import { useAppSpin } from "@/application";
import {
  useAsyncProjectDataSource,
  useAsyncQuarterDataSource,
  useProjectSelectScope,
  useReportId,
} from "@/schema-component";
import { apiBase } from "@/utils";

export const PreviewPage = () => {
  const { reportId: shareURL } = useReportId();

  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useRequest<APiWrap<DashboardItem>>(
    `${apiBase}/dashboard/preview/${shareURL}`,
    {
      method: "GET",
      refreshDeps: [shareURL],
    },
  );
  const name = get(data, "data.data.name");
  const description = get(data, "data.data.description");
  const schema = get(data, "data.data.content", "{}") || "{}";

  const projectSelectScope = useProjectSelectScope();

  if (!schema || isLoading || !projectSelectScope) {
    return render();
  }

  return (
    <RecursionSchemaComponentWrap
      components={options?.components}
      scope={{
        ...options?.scope,
        ...projectSelectScope,
        useAsyncProjectDataSource,
        useAsyncQuarterDataSource,
        dashboardDt: get(data, "data.data", {}) || {},
      }}
    >
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
      <RecursionField schema={JSON.parse(schema)} key={schema} />
    </RecursionSchemaComponentWrap>
  );
};
