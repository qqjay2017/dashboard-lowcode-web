import { memo } from "react";

import { ChartTemplateWithDataSource } from "./ChartTemplateWithDataSource";
import { ChartTemplateWithOutData } from "./ChartTemplateWithOutData";

import type { SchemComponentWithDataSourceProps } from "@/types";

interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string;
}

export function ChartTemplate(props: ChartTemplateProps) {
  console.log(props, "props");
  const { dataSource } = props;
  if (dataSource && dataSource.dataSourceId) {
    return <ChartTemplateWithDataSource {...props} />;
  } else {
    <ChartTemplateWithOutData {...props} />;
  }
}
