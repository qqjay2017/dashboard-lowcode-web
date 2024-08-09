import { Space } from "antd";
import type { ComponentProps } from "react";
import React, { useMemo } from "react";
import { css } from "@emotion/css";
import { DownOutlined } from "@ant-design/icons";
import { createForm } from "@formily/core";
import { Form, FormGrid, GridColumn } from "@formily/antd-v5";
import { Field } from "@formily/react";

import { ResetButton, SubmitButton } from "@/dashboard-themes/ui";
import type { FormItemComponentProps } from "@/types";

export type CollapsibleFormFieldType = ComponentProps<typeof Field>[];

interface ICollapsibleFormProps extends FormItemComponentProps {
  initialValues?: any;
  fields?: CollapsibleFormFieldType;
}

export default function CollapsibleForm({
  value,
  onChange,
  initialValues,
  fields = [],
}: ICollapsibleFormProps) {
  const form = useMemo(() => {
    return createForm({
      initialValues,
    });
  }, []);
  const [expand, setExpand] = React.useState(false);

  return (
    <div
      className={css`
        width: 100%;
        padding-top: 0.1rem;
        padding-bottom: 0.2rem;
      `}
    >
      <Form
        form={form}
        colon={true}
        labelWidth={90}
        labelAlign="right"
        className={css`
          .ant-checkbox-wrapper,
          .ant-formily-item-label-content {
            color: #cad0e0;
          }
        `}
      >
        <FormGrid
          maxColumns={[1, 24, 24]}
          minColumns={[1, 24, 24]}
          columnGap={24}
          rowGap={0}
          minWidth={200}
          colWrap
        >
          {fields.map((field, index) => {
            if (!expand && index >= 2) {
              return null;
            }
            return <Field key={String(field.name)} {...field} />;
          })}
        </FormGrid>
        <div
          className={css`
            text-align: right;
          `}
        >
          <Space size={8}>
            <ResetButton
              onClick={() => {
                form?.reset();
              }}
            >
              重置
            </ResetButton>
            <SubmitButton
              onClick={() => {
                form?.submit((values) => {
                  onChange && onChange(values);
                });
              }}
            >
              查询
            </SubmitButton>

            <div
              className={css`
                color: #008dfa;
                font-size: 14px;
                margin-left: 8px;
                cursor: pointer;
              `}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <DownOutlined rotate={expand ? 180 : 0} />
              {expand ? "收起" : "展开"}
            </div>
          </Space>
        </div>
      </Form>
    </div>
  );
}
