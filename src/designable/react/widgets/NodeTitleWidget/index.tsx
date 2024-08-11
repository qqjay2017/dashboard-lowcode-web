import React from "react";
import { observer } from "@formily/reactive-react";
import { get } from "lodash-es";
import { useExpressionScope } from "@formily/react";
import type { TreeNode } from "@/designable/core";

import { useFetchChartAll } from "@/schema-component/widgets";

export interface INodeTitleWidgetProps {
  node: TreeNode;
}

function ChartTemplateName({ chartTemplateId }: { chartTemplateId: string }) {
  const { data: chartAll } = useFetchChartAll();
  const chartIdMap = (chartAll || []).reduce((memo, cur) => {
    memo[cur.id] = {
      ...cur,
    };
    return memo;
  }, {});

  return <>{get(chartIdMap, `${chartTemplateId}.name`)}</>;
}

export const NodeTitleWidget: React.FC<INodeTitleWidgetProps> = observer(
  (props) => {
    const takeNode = () => {
      const node = props.node;
      if (node.componentName === "$$ResourceNode$$") {
        return node.children[0];
      }
      return node;
    };
    const node = takeNode();

    const scope = useExpressionScope();

    const title = get(node, "designerProps.title");
    const isChartTemplate = get(node, "props.x-component") === "ChartTemplate";
    const chartTemplateId = get(node, "props.x-component-props.chartId");

    return (
      <>
        {isChartTemplate ? (
          <ChartTemplateName chartTemplateId={chartTemplateId} />
        ) : (
          title || node.componentName || "componentName"
        )}
      </>
    );
  }
);
