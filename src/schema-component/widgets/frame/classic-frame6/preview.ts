import { connect } from "@formily/react";
import ClassicFrame6 from "./index";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyClassicFrame6: DnFC<any> = connect(ClassicFrame6);

FormilyClassicFrame6.Resource = createResource({
  title: "边框6",
  icon: rs("/dashboard-assets/schema-component/classic-frame6/preview.png"),

  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "ClassicFrame6",
        "x-component-props": {
          title: "默认标题",
          headerH: 0.5111,
        },
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "0px 0px 0px 0px",
          w: 3,
          h: 3,
        },
      },
    },
  ],
});
FormilyClassicFrame6.Behavior = createBehavior({
  name: "ClassicFrame6",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ClassicFrame6",
  designerProps: {
    title: "边框6",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({
      title: {
        type: "string",
        title: "标题",
        "x-decorator": "FormItem",
        "x-component": "Input",
      },
    }),
  },
});
