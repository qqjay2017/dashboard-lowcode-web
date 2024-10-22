import { connect } from "@formily/react";
import { ProjectAttendanceAnaTable } from "./ProjectAttendanceAnaTable";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { rs } from "@/utils";
import { createFieldSchema } from "@/schema-component/core";

export const FormilyProjectAttendanceAnaTable: DnFC<any> = connect(
  ProjectAttendanceAnaTable
);

FormilyProjectAttendanceAnaTable.Resource = createResource({
  title: "项目出勤情况分析",

  icon: rs("/dashboard-assets/personInfoMng/WX20240702-225508@2x.png"),

  elements: [
    {
      componentName: "Field",
      props: {
        type: "void",
        "x-component": "ProjectAttendanceAnaTable",
        "x-decorator": "PositionDecorator",
        "x-decorator-props": {
          padding: "24px 24px 24px 24px",
          w: 3,
          h: 3,
        },
      },
    },
  ],
});
FormilyProjectAttendanceAnaTable.Behavior = createBehavior({
  name: "ProjectAttendanceAnaTable",
  selector: (node) =>
    node.componentName === "Field" &&
    node.props["x-component"] === "ProjectAttendanceAnaTable",
  designerProps: {
    title: "项目出勤情况分析",
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
});
