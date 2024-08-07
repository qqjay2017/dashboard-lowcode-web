import { Button, Col, Row, Space } from "antd";
import type { ComponentProps, ComponentType } from "react";
import React, { useMemo } from "react";
import { css } from "@emotion/css";
import { DownOutlined } from "@ant-design/icons";
import { createForm } from "@formily/core";
import {
  Checkbox,
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  Input,
  Radio,
} from "@formily/antd-v5";
import { Field } from "@formily/react";
import { uid } from "@formily/shared";
import { ResetButton, SubmitButton } from "@/dashboard-themes/ui";
import type { FormItemComponentProps } from "@/types";

const fields: ComponentProps<typeof Field>[] = [
  {
    name: "date",
    title: "",
    decorator: [
      FormItem,
      {
        gridSpan: 7,
      },
    ],
    component: [
      Radio.Group,
      {
        optionType: "button",
      },
    ],

    dataSource: [
      {
        label: "本周",
        value: 1,
      },
      {
        label: "本月",
        value: 2,
      },
      {
        label: "本年度",
        value: 3,
      },
    ],
  },
  {
    name: "date1",
    title: "上报时间",
    decorator: [
      FormItem,
      {
        gridSpan: 12,
      },
    ],
    component: [DatePicker.RangePicker],
  },
  {
    name: uid(),
    decorator: [
      FormItem,
      {
        gridSpan: 5,
      },
    ],
    component: [],
  },
  {
    name: "date2",
    title: "货物名称",
    decorator: [
      FormItem,
      {
        gridSpan: 8,
      },
    ],
    component: [Input],
  },
  {
    name: "date3",
    title: "送货单单号",
    decorator: [
      FormItem,
      {
        gridSpan: 8,
      },
    ],
    component: [Input],
  },
  {
    name: "date4",
    title: "发货单位",
    decorator: [
      FormItem,
      {
        gridSpan: 8,
      },
    ],
    component: [Input],
  },
  {
    name: "date5",
    title: "车牌号",
    decorator: [
      FormItem,
      {
        gridSpan: 8,
      },
    ],
    component: [Input],
  },
  {
    name: "date6",
    title: "",
    decorator: [
      FormItem,
      {
        gridSpan: 8,
      },
    ],
    component: [Checkbox.Group],
    dataSource: [
      {
        label: "超量",
        value: 1,
      },
      {
        label: "正常",
        value: 2,
      },
      {
        label: "缺量",
        value: 3,
      },
    ],
  },
];

interface ICollapsibleFormProps extends FormItemComponentProps {
  initialValues?: any;
}

export default function CollapsibleForm({
  value,
  onChange,
  initialValues,
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
        padding: 0.1rem 0.24rem 0.2rem 0.24rem;
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
        <FormGrid maxColumns={24} minColumns={24} columnGap={24} rowGap={0}>
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

            <a
              className={css`
                color: #008dfa;
                font-size: 14px;
                margin-left: 8px;
              `}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <DownOutlined rotate={expand ? 180 : 0} />{" "}
              {expand ? "收起" : "展开"}
            </a>
          </Space>
        </div>
      </Form>
    </div>
  );
}
