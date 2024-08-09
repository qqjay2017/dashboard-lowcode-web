import type { ComponentProps } from "react";
import { Checkbox, DatePicker, FormItem, Input, Radio } from "@formily/antd-v5";
import type { Field } from "@formily/react";

export const fields: ComponentProps<typeof Field>[] = [
  {
    name: "date",
    title: "",
    decorator: [
      FormItem,
      {
        gridSpan: 8,
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
        gridSpan: 16,
      },
    ],
    component: [DatePicker.RangePicker],
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
