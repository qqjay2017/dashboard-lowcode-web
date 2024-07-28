import { connect } from "@formily/react";
import { Header5 } from "./Header5";
import { createBehavior, createResource } from "@/designable/core";
import type { DnFC } from "@/designable/react";
import { rs } from "@/utils";
import { createFieldSchema } from "@/designable/Field";

export const FormilyHeader5: DnFC<any> = connect(Header5);

FormilyHeader5.Resource = createResource({
  title: "头部5",
  icon: rs("/assets/schema-component/header5/WX20240719-232752@2x.png"),
  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-decorator": "PositionDecorator",
        "x-component": "Header5",
      },
    },
  ],
});

FormilyHeader5.Behavior = createBehavior({
  name: "Header5",
  selector: (node) =>
    node.componentName === "Field" && node.props["x-component"] === "Header5",
  designerProps: {
    title: "头部5",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    defaultProps: {
      // title: "{{dashboardDt.name}}",
      // "x-reactions": {
      //   dependencies: {},
      //   when: true,
      //   fulfill: {
      //     schema: {
      //       "x-component-props.query": "{{$deps}}",
      //     },
      //   },
      // },
    },
    propsSchema: createFieldSchema({
      type: "object",
      properties: {
        title: {
          type: "string",
          title: "标题",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
      },
    }),
    //  createFieldSchema(),
  },
});
