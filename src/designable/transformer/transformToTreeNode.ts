import type { ISchema } from "@formily/json-schema";
import { Schema } from "@formily/json-schema";
import type { ITreeNode } from "@/designable/core";
import { clone, uid } from "@/designable/shared";

export interface ITransformerOptions {
  designableFieldName?: string;
  designableFormName?: string;
}

export interface IFormilySchema {
  schema?: any;
  root?: Record<string, any>;
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

export function transformToTreeNode(
  formily: IFormilySchema = {},
  options?: ITransformerOptions
) {
  const realOptions = createOptions(options);
  const root: ITreeNode = {
    componentName: realOptions.designableFormName,
    props: formily.root,
    children: [],
  };
  const schema = new Schema(formily.schema);
  const cleanProps = (props: any) => {
    if (props.name === props["x-designable-id"]) {
      delete props.name;
    }
    delete props.version;
    delete props._isJSONSchemaObject;
    return props;
  };
  const appendTreeNode = (parent: ITreeNode, schema: Schema) => {
    if (!schema) return;
    const current = {
      id: schema["x-designable-id"] || uid(),
      componentName: realOptions.designableFieldName,
      props: cleanProps(schema.toJSON(false)),
      children: [],
    };
    parent.children.push(current);
    if (schema.items && !Array.isArray(schema.items)) {
      appendTreeNode(current, schema.items);
    }
    schema.mapProperties((schema) => {
      schema["x-designable-id"] = schema["x-designable-id"] || uid();
      appendTreeNode(current, schema);
    });
  };
  schema.mapProperties((schema) => {
    schema["x-designable-id"] = schema["x-designable-id"] || uid();
    appendTreeNode(root, schema);
  });
  return root;
}
