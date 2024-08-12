import { connect } from "@formily/react";
import Weighbridge from ".";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { getAllQueryKeys } from "@/schema-component/shared";

import { rs } from "@/utils";
import { createFieldSchema } from "@/schema-component/core";

export const FormilyWeighbridge: DnFC<any> = connect(Weighbridge);

FormilyWeighbridge.Resource = createResource({
  title: "地磅-过磅记录",

  icon: rs("/dashboard-assets/schema-component/weighbridge/preview.png"),
  elements: [
    {
      componentName: "Field",

      props: {
        type: "void",
        "x-component": "Weighbridge",
        "x-component-props": {
          queryKeys: getAllQueryKeys(),
        },
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          disOffsetHeaderSize: true,
          padding: "0px 0px 0px 0px",
          w: 3,
          h: 5,
          mobileH: 8.5,
        },
      },
    },
  ],
});

FormilyWeighbridge.Behavior = createBehavior({
  name: "Weighbridge",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "Weighbridge",
  designerProps: {
    title: "地磅-过磅记录",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
