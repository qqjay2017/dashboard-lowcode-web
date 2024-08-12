import { Col, Row, Space } from "antd";
import type { ComponentProps } from "react";
import React, { useMemo } from "react";
import { css } from "@emotion/css";
import { DownOutlined } from "@ant-design/icons";
import { createForm } from "@formily/core";
import { Form } from "@formily/antd-v5";
import { Field } from "@formily/react";

import { valuesFormat } from "./valuesFormat";
import { ResetButton, SubmitButton } from "@/dashboard-themes/ui";
import type { FormItemComponentProps } from "@/types";
import type { IFieldItem } from "@/schema-component/types";
import { useDashboardRoot } from "@/schema-component/hooks";

export type CollapsibleFormFieldType = ComponentProps<typeof Field>[];

interface ICollapsibleFormProps extends FormItemComponentProps {
  initialValues?: any;
  fields?: IFieldItem[];
}

export default function CollapsibleForm({
  value,
  onChange,
  initialValues,
  fields = [],
}: ICollapsibleFormProps) {
  const { isPc } = useDashboardRoot();
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
        padding-bottom: 0rem;
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
        <Row gutter={[24, 0]}>
          {fields.map((field, index) => {
            if (!expand && index >= 2) {
              return null;
            }
            return (
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={field?.gridCol?.span || 8}
                xl={field?.gridCol?.span || 8}
                {...field?.gridCol}
                key={String(field.name)}
              >
                <Field {...field} />
              </Col>
            );
          })}
          <Col span={!isPc ? 24 : expand ? 8 : 24}>
            <div
              className={css`
                text-align: right;
                padding-bottom: 24px;
              `}
            >
              <Space size={8}>
                <ResetButton
                  onClick={() => {
                    form?.reset();
                    onChange && onChange({});
                  }}
                >
                  重置
                </ResetButton>
                <SubmitButton
                  onClick={() => {
                    form?.submit((values) => {
                      onChange && onChange(valuesFormat(values));
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
          </Col>
        </Row>
      </Form>
    </div>
  );
}
