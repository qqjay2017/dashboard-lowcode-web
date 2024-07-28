import { memo } from "react";

import { ChartTemplateWithDataSource } from "./ChartTemplateWithDataSource";
import { ChartTemplateWithOutData } from "./ChartTemplateWithOutData";

import type { SchemComponentWithDataSourceProps } from "@/types";

interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string;
}

export const ChartTemplate = memo((props: ChartTemplateProps) => {
  const { dataSource } = props;
  if (dataSource && dataSource.dataSourceId) {
    return <ChartTemplateWithDataSource {...props} />;
  } else {
    <ChartTemplateWithOutData {...props} />;
  }
});
