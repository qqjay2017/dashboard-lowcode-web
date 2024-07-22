import { SchemaOptionsContext, useFieldSchema } from "@formily/react";
import { Button, ConfigProvider } from "antd";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createForm } from "@formily/core";
import { Form, Reset, Submit } from "@formily/antd-v5";
import { uid } from "@formily/shared";
import { useLocation } from "react-router-dom";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import { dispatchInsert } from "../utils";
import { allComponentTypeSettingSchema } from "../allComponentTypeSettingSchema";
import { SchemaComponent } from "../../../core";
import { useSaveAllFieldSchema } from "../../../hooks";
import type { MonacoEditorHandles } from "../../MonacoEditor";
import { MonacoEditor } from "../../MonacoEditor";
import { useApp } from "@/application";
import { isRootAddress } from "@/utils";
import { FormContainer, FormSubmitBtnWrap } from "@/style-components";

export interface IDesignComponentSettingConfigProps {
  address: string;
  schemaCompoenntId?: string;
}
export const DesignComponentSettingCode = ({
  address,
  schemaCompoenntId,
}: IDesignComponentSettingConfigProps) => {
  const fieldSchema = useFieldSchema();

  const [jsonStr, setJsonStr] = useState("");
  const editorRef = useRef<MonacoEditorHandles>(null);
  const { saveLocalFieldSchema } = useSaveAllFieldSchema();

  useEffect(() => {
    setJsonStr(JSON.stringify(fieldSchema.toJSON()));
    editorRef.current?.formatDocument && editorRef.current.formatDocument();
  }, [schemaCompoenntId, address]);

  const onSubmit = async () => {
    const s = JSON.parse(jsonStr || "{}");

    saveLocalFieldSchema({
      address,
      schema: s,
    });
  };

  return (
    <div>
      <MonacoEditor
        ref={editorRef}
        height="calc( 100vh -  138px )"
        theme="vs-dark"
        value={jsonStr}
        readOnly={false}
        onChange={(e) => {
          setJsonStr(e);
        }}
        language="json"
      />
      <FormSubmitBtnWrap
        className={css`
          background-color: rgb(30, 30, 30);
        `}
      >
        <Button onClick={onSubmit} type="primary">
          应用配置
        </Button>
      </FormSubmitBtnWrap>
    </div>
  );
};

export const DesignComponentSettingConfig = ({
  address,
  schemaCompoenntId,
}: IDesignComponentSettingConfigProps) => {
  const { pathname } = useLocation();
  const app = useApp();
  const [formId, setFormId] = useState(uid());
  const fieldSchema = useFieldSchema();

  const curSchema = isRootAddress(address)
    ? fieldSchema.toJSON()
    : get(fieldSchema.toJSON(), `properties.${schemaCompoenntId}`);
  const componentType = curSchema?.["x-component"];

  const typeSettingSchema = {
    ...Object.keys(app.components).reduce((memo, curKey) => {
      const cur = app.components[curKey];
      if (cur && cur.settingSchema) {
        memo[curKey] = cur.settingSchema;
      }
      return memo;
    }, {}),
    ...allComponentTypeSettingSchema,
  };
  const dashboardRootFormSchema =
    typeSettingSchema[componentType] || typeSettingSchema[address] || {};

  const options = useContext(SchemaOptionsContext);

  const { saveLocalFieldState, saveRemoteFieldSchema } =
    useSaveAllFieldSchema();

  const form = useMemo(() => {
    return createForm({
      initialValues: {
        formId,
        ...curSchema?.["x-component-props"],
        dependencies: !schemaCompoenntId
          ? []
          : Object.keys(
              get(
                fieldSchema,
                `properties.${schemaCompoenntId}.x-reactions.dependencies`,
                [],
              ) || [],
            ),
        decoratorProps: curSchema?.["x-decorator-props"],
        decoratorPadding: curSchema?.["x-decorator-props"]?.padding || [],
        componentType: curSchema?.["x-component"],
        componentAddress: address,
      },
    });
  }, [
    address,
    formId,
    pathname,
    schemaCompoenntId,
    fieldSchema,
    componentType,
  ]);

  useEffect(() => {
    const onSchemaChange = () => {
      setFormId(uid());
    };
    document.addEventListener("dispatchFieldSchemaChange", onSchemaChange);
    return () => {
      document.removeEventListener("dispatchFieldSchemaChange", onSchemaChange);
    };
  }, []);

  const onSubmit = async ({
    decoratorProps,
    decoratorPadding,
    dependencies = [],
    ...values
  }) => {
    const s: any = {
      "x-component-props": {
        ...values,
      },

      "x-decorator-props": {
        ...decoratorProps,
        padding: decoratorPadding || decoratorProps?.padding || undefined,
      },
    };

    if (
      schemaCompoenntId &&
      schemaCompoenntId !== "quarterSelect" &&
      schemaCompoenntId !== "projectSelect"
    ) {
      s["x-reactions"] = {
        dependencies: dependencies.reduce((memo, cur) => {
          memo[cur] = cur;
          return memo;
        }, {}),
        when: true,
        fulfill: {
          schema: {
            "x-component-props.query": "{{$deps}}",
          },
        },
      };
    }
    saveLocalFieldState({
      address,
      schema: s,
    });
    await saveRemoteFieldSchema();
    dispatchInsert();
  };

  return (
    <Form
      form={form as any}
      layout="vertical"
      labelCol={4}
      wrapperCol={20}
      className={css`
        max-width: 100%;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        form {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      `}
    >
      <FormContainer
        btns={[
          <Reset key={"reset"}>重置</Reset>,
          <Submit key={"submit"} onSubmit={onSubmit}>
            应用配置
          </Submit>,
        ]}
      >
        <SchemaComponent
          components={options.components}
          scope={options.scope}
          schema={dashboardRootFormSchema}
        />
      </FormContainer>
    </Form>
  );
};
