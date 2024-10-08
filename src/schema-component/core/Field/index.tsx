import {
  ArrayField,
  Field as InternalField,
  ObjectField,
  VoidField,
  observer,
} from "@formily/react";
import type { PropsWithChildren } from "react";
import { FormPath, each } from "@formily/shared";
import type { ISchema } from "@formily/json-schema";
import { Schema } from "@formily/json-schema";
import { toJS } from "@formily/reactive";
import PositionDecorator from "../PositionDecorator";
import { createBehavior } from "@/designable/core";
import {
  type DnFC,
  useComponents,
  useDesigner,
  useTreeNode,
} from "@/designable/react";
import { isArr, isStr, reduce } from "@/designable/shared";

interface FieldProps extends PropsWithChildren {
  title?: string;
  type?: string;
}

const ObjectContainer: React.FC<PropsWithChildren> = observer((props) => {
  return <>{props.children}</>;
});
Schema.silent(true);

const SchemaStateMap = {
  title: "title",
  description: "description",
  default: "value",
  enum: "dataSource",
  readOnly: "readOnly",
  writeOnly: "editable",
  required: "required",
  "x-content": "content",
  "x-value": "value",
  "x-editable": "editable",
  "x-disabled": "disabled",
  "x-read-pretty": "readPretty",
  "x-read-only": "readOnly",
  "x-visible": "visible",
  "x-hidden": "hidden",
  "x-display": "display",
  "x-pattern": "pattern",
};
const NeedShownExpression = {
  title: true,
  description: true,
  default: true,
  "x-content": true,
  "x-value": true,
};

const isExpression = (val: any) => isStr(val) && /^\{\{.*\}\}$/.test(val);

function toDesignableFieldProps(
  schema: ISchema,
  components: any,
  nodeIdAttrName: string,
  id: string
) {
  const results: any = {};
  each(SchemaStateMap, (fieldKey, schemaKey) => {
    const value = schema[schemaKey];

    if (fieldKey === "reactions" && value) {
      results[fieldKey] = value;
    } else if (isExpression(value)) {
      if (!NeedShownExpression[schemaKey]) return;
      if (value) {
        results[fieldKey] = value;
      }
    } else if (value) {
      results[fieldKey] = filterExpression(value);
    }
  });
  // debugger;
  if (!components.PositionDecorator) {
    components.PositionDecorator = PositionDecorator;
  }

  function filterExpression(val: any) {
    if (typeof val === "object") {
      const isArray = isArr(val);
      const results = reduce(
        val,
        (buf: any, value, key) => {
          if (isExpression(value)) {
            return buf;
          } else {
            const results = filterExpression(value);
            if (results === undefined || results === null) return buf;
            if (isArray) {
              return buf.concat([results]);
            }
            buf[key] = results;
            return buf;
          }
        },
        isArray ? [] : {}
      );
      return results;
    }
    if (isExpression(val)) {
      return;
    }
    return val;
  }
  function toDesignableFieldProps(
    schema: ISchema,
    components: any,
    nodeIdAttrName: string,
    id: string
  ) {
    const results: any = {};
    each(SchemaStateMap, (fieldKey, schemaKey) => {
      const value = schema[schemaKey];

      if (fieldKey === "reactions" && value) {
        results[fieldKey] = value;
      } else if (isExpression(value)) {
        if (!NeedShownExpression[schemaKey]) return;
        if (value) {
          results[fieldKey] = value;
        }
      } else if (value) {
        results[fieldKey] = filterExpression(value);
      }
    });
    // debugger;
    if (!components.PositionDecorator) {
      components.PositionDecorator = PositionDecorator;
    }
    const decorator =
      schema["x-decorator"] &&
      FormPath.getIn(components, schema["x-decorator"]);
    const component =
      schema["x-component"] &&
      FormPath.getIn(components, schema["x-component"]);
    const decoratorProps = schema["x-decorator-props"] || {};
    const componentProps = schema["x-component-props"] || {};

    if (decorator) {
      results.decorator = [decorator, toJS(decoratorProps)];
    }
    if (component) {
      results.component = [component, toJS(componentProps)];
    }
    if (decorator) {
      FormPath.setIn(results.decorator[1], nodeIdAttrName, id);
    } else if (component) {
      FormPath.setIn(results.component[1], nodeIdAttrName, id);
    }
    results.title = results.title && (
      <span data-content-editable="title">{results.title}</span>
    );
    results.description = results.description && (
      <span data-content-editable="description">{results.description}</span>
    );

    return results;
  }
  const decorator =
    schema["x-decorator"] && FormPath.getIn(components, schema["x-decorator"]);
  const component =
    schema["x-component"] && FormPath.getIn(components, schema["x-component"]);
  const decoratorProps = schema["x-decorator-props"] || {};
  const componentProps = schema["x-component-props"] || {};

  if (decorator) {
    results.decorator = [decorator, toJS(decoratorProps)];
  }
  if (component) {
    results.component = [component, toJS(componentProps)];
  }
  if (decorator) {
    FormPath.setIn(results.decorator[1], nodeIdAttrName, id);
  } else if (component) {
    FormPath.setIn(results.component[1], nodeIdAttrName, id);
  }
  results.title = results.title && (
    <span data-content-editable="title">{results.title}</span>
  );
  results.description = results.description && (
    <span data-content-editable="description">{results.description}</span>
  );

  return results;
}

const Field: DnFC<FieldProps> = observer((props) => {
  const designer = useDesigner();
  const components = useComponents();
  const node = useTreeNode();

  if (!node) return null;

  const fieldProps = toDesignableFieldProps(
    props,
    components,
    designer.props.nodeIdAttrName,
    node.id
  );

  if (props.type === "object") {
    return (
      <ObjectContainer>
        <ObjectField {...fieldProps} name={node.id}>
          {props.children}
        </ObjectField>
      </ObjectContainer>
    );
  } else if (props.type === "array") {
    return <ArrayField {...fieldProps} name={node.id} />;
  } else if (node.props.type === "void") {
    return (
      <VoidField {...fieldProps} name={node.id}>
        {props.children}
      </VoidField>
    );
  }
  return <InternalField {...fieldProps} name={node.id} />;
});

Field.Behavior = createBehavior({
  name: "Field",
  selector: "Field",
});

export default Field;
