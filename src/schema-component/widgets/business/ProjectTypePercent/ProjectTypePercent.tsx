import { get } from "lodash-es";
import type { EChartsInstance } from "echarts-for-react";
import ReactECharts from "echarts-for-react";
import { useMemo, useState } from "react";
import type { ProjectTypeListItem} from "./getPieOption";

import { ProjectTypePercentSchemeWrap } from "./ProjectTypePercentSchemeWrap";
import { ProjectTypePercentMenuItem } from "./ProjectTypePercentMenuItem";
import { ProjectTypePercentSettingSchema } from "./ProjectTypePercentSettingSchema";
import { useProjectTypePercentOption } from "./useProjectTypePercentOption";
import { ConetentSpin } from "@/schema-component/components";
import { useRequest } from "@/api-client";


export function ProjectTypePercent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading } = useRequest("/api/bg/v1/project/type", {
    method: "GET",
    headers: {
      "system-id": "167096554103328853",
    },
  });
  const list: ProjectTypeListItem[] = get(data, "data.data", []) || [];
  const option = useProjectTypePercentOption(list, activeIndex);
  const onEvents = useMemo(() => {
    return {
      mouseout: (a: any, chart: EChartsInstance) => {
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 1,
          dataIndex: a.dataIndex,
        });
      },
      mouseover: (a: any, chart: EChartsInstance) => {
        chart.dispatchAction({
          type: "highlight",
          seriesIndex: 1,
          dataIndex: a.dataIndex,
        });
      },
      click: (a: any, chart: EChartsInstance) => {
        setActiveIndex(a.dataIndex);
      },
    };
  }, []);

  return (
    <ConetentSpin isLoading={isLoading}>
      <ReactECharts
        style={{
          width: "100%",
          height: "100%",
        }}
        option={option}
        onEvents={onEvents}
      />
    </ConetentSpin>
  );
}
ProjectTypePercent.displayName = "ProjectTypePercent";
ProjectTypePercent.schemaFn = ProjectTypePercentSchemeWrap;
ProjectTypePercent.menuItem = ProjectTypePercentMenuItem;
ProjectTypePercent.settingSchema = ProjectTypePercentSettingSchema;
