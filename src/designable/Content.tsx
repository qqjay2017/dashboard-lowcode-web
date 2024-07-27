import { observer } from "@formily/reactive-react";
import { ComponentTreeWidget } from "./react/widgets";
import { createBehavior, createResource } from "./core";
import type { DnFC } from "./react";
import { Field } from "./Field";
import { Root } from "@/schema-component";

export const Card: DnFC<any> = observer((props) => {
  return (
    <div
      {...props}
      style={{
        width: 200,
        height: 100,
        ...props.style,
        background: "#eee",
        border: "1px solid #ddd",
        display: "flex",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children ? props.children : <span>拖拽字段进入该区域</span>}
    </div>
  );
});

Card.Behavior = createBehavior({
  name: "Card",
  selector: (node) =>
    node.componentName === "Field" && node.props["x-component"] === "Card",
  designerProps: {
    droppable: false,
    resizable: {
      grid: {
        width: -1, // -1代表网格宽度以元素宽度为基准，0代表无网格，大于0代表按某个网格宽度拖拽
        height: -1,
      },
      width(node, value) {
        // 用户只需要将拖拽计算出来的宽度赋值给组件的属性上即可
        node.props["x-component-props"].style.width = value;
      },
      height(node, value) {
        // 用户只需要将拖拽计算出来的高度赋值给组件的属性上即可
        node.props["x-component-props"].style.height = value;
      },
    },
    translatable: {
      grid: {
        width: -1, // -1代表网格宽度以元素宽度为基准，0代表无网格，大于0代表按某个网格宽度拖拽
        height: -1,
      },
      left(node, value) {
        // 用户只需要将拖拽计算出来的左侧偏移量赋值给组件的属性上即可
      },
      top(node, value) {
        // 用户只需要将拖拽计算出来的顶部偏移量赋值给组件的属性上即可
      },
    },
  },
});

Card.Resource = createResource({
  title: "卡片",
  icon: "CardSource",
  elements: [
    {
      componentName: "Field",
      props: {
        title: "输入框",
        type: "void",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          w: 3,
          y: 3,
          padding: [0, 0, 0, 0],
        },
        "x-component": "Card",
      },
    },
  ],
  // elements: [
  //   {
  //     componentName: "Card",
  //     props: {
  //       title: "卡片",
  //     },
  //   },
  // ],
});
export function Content() {
  return (
    <ComponentTreeWidget
      components={{
        Root,
        Card,
        Field,
      }}
    />
  );
}
