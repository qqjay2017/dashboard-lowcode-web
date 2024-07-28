import type { ISchema } from "@formily/react";
import { clone } from "@formily/shared";
import { ReactionsSetter } from "../setters";
import type { IFormilySchema, ITransformerOptions, ITreeNode } from "../core";
import { positionDecoratorPropsSchema } from "./positionDecoratorPropsSchema";

const CSSStyle: ISchema = {
  type: "void",
  properties: {
    "style.width": {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "SizeInput",
    },
    "style.height": {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "SizeInput",
    },
    "style.display": {
      "x-component": "DisplayStyleSetter",
    },
    "style.background": {
      "x-component": "BackgroundStyleSetter",
    },
    "style.boxShadow": {
      "x-component": "BoxShadowStyleSetter",
    },
    "style.font": {
      "x-component": "FontStyleSetter",
    },
    "style.margin": {
      "x-component": "BoxStyleSetter",
    },
    "style.padding": {
      "x-component": "BoxStyleSetter",
    },
    "style.borderRadius": {
      "x-component": "BorderRadiusStyleSetter",
    },
    "style.border": {
      "x-component": "BorderStyleSetter",
    },
    "style.opacity": {
      "x-decorator": "FormItem",
      "x-component": "Slider",
      "x-component-props": {
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
};

function createComponentSchema(
  component: ISchema["properties"],
  decorator: ISchema
) {
  return {
    "component-group": component && {
      title: "组件属性",
      type: "void",
      "x-component": "CollapseItem",
      "x-reactions": {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      properties: {
        "x-component-props": {
          type: "object",
          properties: {
            ...(component as any),
            dataSource: {
              type: "object",
              title: "数据源",
              required: false,
              "x-decorator": "FormItem",
              "x-component": "DataSourceBind",
            },
          },
        },
      },
    },
    "decorator-group": decorator && {
      title: "容器属性",
      type: "void",
      "x-component": "CollapseItem",
      "x-component-props": { defaultExpand: false },
      "x-reactions": {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      properties: {
        "x-decorator-props": decorator,
      },
    },
  };
}

export function createFieldSchema(
  component?: ISchema["properties"],
  decorator: ISchema = positionDecoratorPropsSchema
): ISchema {
  return {
    type: "object",
    properties: {
      "field-group": {
        title: "字段属性",
        type: "void",
        "x-component": "CollapseItem",
        properties: {
          // 'x-display': {
          //     'type': 'string',
          //     'enum': ['visible', 'hidden', 'none', ''],
          //     'x-decorator': 'FormItem',
          //     'x-component': 'Select',
          //     'x-component-props': {
          //         defaultValue: 'visible',
          //     },
          // },

          "x-reactions": {
            "x-decorator": "FormItem",
            "x-component": "ReactionsSetter",
          },
        },
      },
      ...createComponentSchema(component, decorator),
    },
  };
}
function createOptions(options: ITransformerOptions): ITransformerOptions {
  return {
    designableFieldName: "Field",
    designableFormName: "Root",
    ...options,
  };
}

function findNode(node: ITreeNode, finder?: (node: ITreeNode) => boolean) {
  if (!node) return;
  if (finder(node)) return node;
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    if (findNode(node.children[i])) return node.children[i];
  }
}

export function transformToSchema(
  node: ITreeNode,
  options?: ITransformerOptions
): IFormilySchema {
  const realOptions = createOptions(options);
  const root = findNode(node, (child) => {
    return child.componentName === realOptions.designableFormName;
  });
  const schema = {
    type: "object",
    properties: {},
  };
  if (!root) return { schema };
  const createSchema = (node: ITreeNode, schema: ISchema = {}) => {
    if (node !== root) {
      Object.assign(schema, clone(node.props));
    }
    schema["x-designable-id"] = node.id;
    if (schema.type === "array") {
      if (node.children[0]) {
        if (
          node.children[0].componentName === realOptions.designableFieldName
        ) {
          schema.items = createSchema(node.children[0]);
          schema["x-index"] = 0;
        }
      }
      node.children.slice(1).forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return;
        const key = child.props.name || child.id;
        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]["x-index"] = index;
      });
    } else {
      node.children.forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return;
        const key = child.props.name || child.id;
        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]["x-index"] = index;
      });
    }
    return schema;
  };
  return { root: clone(root.props), schema: createSchema(root, schema) };
}
