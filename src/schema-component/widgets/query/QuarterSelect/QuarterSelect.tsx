import { useField } from "@formily/react";

import { QuaterSelectValue } from "./QuaterSelectValue";

import type { QuarterItemType } from "./types";
import { generateAllQuarters } from "./generateQuarters";
import { BusSelect } from "@/dashboard-themes/ui";

import { sizeFormat } from "@/utils";
import type { FormItemComponentProps } from "@/types";
import { useJfGlobalProjectStore } from "@/schema-component/hooks";
import { useDashboardRoot } from "@/schema-component/hooks/hooks";

const quarterList: QuarterItemType[] = generateAllQuarters();

export function QuarterSelect(props: FormItemComponentProps) {
  const { setQuarter, quarter } = useJfGlobalProjectStore();
  const value = quarter;
  const { colWidth } = useDashboardRoot();
  const { decoratorProps } = useField();
  const w = decoratorProps?.w || 0;

  return (
    <BusSelect
      width={`${sizeFormat(colWidth * w)}px`}
      value={value?.quarterId}
      onChange={(id, qua) => {
        setQuarter(qua);
      }}
      options={quarterList}
      renderSelctValue={QuaterSelectValue}
    />
  );
}
