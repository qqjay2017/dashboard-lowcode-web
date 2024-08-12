import { Checkbox, DatePicker, FormItem, Input, Radio } from "@formily/antd-v5";

import GoodsNameListSelect from "./GoodsNameListSelect";
import GoodsDevCompanyListSelect from "./GoodsDevCompanyListSelect";
import type { IFieldItem } from "@/schema-component/types";

export const fields: IFieldItem[] = [
  {
    name: "dateType",
    title: "",
    gridCol: {
      span: 6,
    },
    decorator: [FormItem],
    component: [
      Radio.Group,
      {
        optionType: "button",
      },
    ],

    dataSource: [
      {
        label: "本周",
        value: "week",
      },
      {
        label: "本月",
        value: "month",
      },
      {
        label: "本年度",
        value: "year",
      },
    ],
  },
  {
    name: "times",
    title: "上报时间",
    gridCol: {
      span: 14,
    },
    decorator: [FormItem],
    component: [DatePicker.RangePicker, { showTime: true }],
  },

  {
    name: "goodsNameList",
    title: "货物名称",

    gridCol: {
      span: 8,
    },
    decorator: [FormItem],
    component: [GoodsNameListSelect],
  },
  {
    name: "deliveryNo",
    title: "送货单单号",
    gridCol: {
      span: 8,
    },
    decorator: [FormItem],
    component: [Input],
  },
  {
    name: "goodsDevCompanyList",
    title: "发货单位",
    gridCol: {
      span: 8,
    },
    decorator: [FormItem],
    component: [GoodsDevCompanyListSelect],
  },
  {
    name: "carNumber",
    title: "车牌号",
    gridCol: {
      span: 8,
    },
    decorator: [FormItem],
    component: [Input],
  },
  {
    name: "weightFlagList",
    title: "",
    gridCol: {
      span: 8,
    },
    decorator: [FormItem],
    component: [
      Checkbox.Group,
      {
        style: {
          marginLeft: 24,
        },
      },
    ],
    dataSource: [
      {
        label: "超量",
        value: 1,
      },
      {
        label: "正常",
        value: 0,
      },
      {
        label: "缺量",
        value: 2,
      },
    ],
  },
];
