import dayjs from "dayjs";
import { ChartTemplateWithOutData } from "../../chart";

import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import type { SchemComponentWithDataSourceProps } from "@/types";

export default function WeightDeviationTrend({
  queryKeys,
}: SchemComponentWithDataSourceProps) {
  const busParams = useQueryToBusParams(queryKeys);
  const { data } = useDataBindFetch(
    {
      dataSourceId: "c4246a48-e711-4317-bb89-a04d71f38ff2",
    },
    {
      startTime: dayjs().subtract(11, "month").startOf("month").valueOf(),
      endTime: dayjs().endOf("month").valueOf(),
      ...busParams,
    }
  );

  return (
    <ChartTemplateWithOutData
      chartId="6b6409e3-5955-404a-9cb9-b14e4ec1e7e4"
      busData={data}
      busDataRes={data}
    />
  );
}
