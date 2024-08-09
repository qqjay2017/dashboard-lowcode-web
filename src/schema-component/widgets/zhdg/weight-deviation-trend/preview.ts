import { connect } from "@formily/react";
import WeightDeviationTrend from ".";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { getAllQueryKeys } from "@/schema-component/shared";
import { createFieldSchema } from "@/designable/Field";
import { rs } from "@/utils";

export const FormilyWeightDeviationTrend: DnFC<any> =
  connect(WeightDeviationTrend);

FormilyWeightDeviationTrend.Resource = createResource({
  title: "重量偏差走向",

  icon: rs(
    "/dashboard-assets/schema-component/WeightDeviationTrend/preview.png"
  ),
  elements: [
    {
      componentName: "Field",

      props: {
        type: "void",
        "x-component": "WeightDeviationTrend",
        "x-component-props": {
          queryKeys: getAllQueryKeys(),
        },
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          disOffsetHeaderSize: true,
          padding: "0px 0px 0px 0px",
          w: 3,
          h: 3,
        },
      },
    },
  ],
});

FormilyWeightDeviationTrend.Behavior = createBehavior({
  name: "WeightDeviationTrend",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "WeightDeviationTrend",
  designerProps: {
    title: "重量偏差走向",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
