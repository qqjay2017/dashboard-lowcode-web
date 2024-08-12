import type { ISchema } from "@formily/react";

const name = {
  type: "string",
  title: "API标题",
  required: true,
  "x-decorator": "FormItem",
  "x-component": "Input",
};
const description = {
  type: "string",
  title: "API说明",
  required: false,
  "x-decorator": "FormItem",
  "x-component": "Input.TextArea",
};

const groupName = {
  type: "string",
  title: "API分组",
  required: false,
  "x-decorator": "FormItem",
  "x-component": "ApiGroupFormItem",
};

export const editApiFormSchema: ISchema = {
  type: "object",
  properties: {
    card: {
      type: "void",
      "x-component": "Card",
      "x-component-props": {},
      properties: {
        name,
        description,
        groupName,
        originName: {
          type: "string",
          title: "API域名",
          required: false,
          "x-decorator": "FormItem",
          "x-component": "ApiOriginFormItem",
        },
        baseName: {
          type: "string",
          title: "API前缀",
          required: false,
          "x-decorator": "FormItem",
          "x-component": "ApiBaseNameFormItem",
        },
        url: {
          type: "string",
          title: "请求地址",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": {
            type: "string",
            pattern: "^/.*$",
            message: "以/开头",
          },
        },
        method: {
          type: "string",
          title: "请求方式",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          enum: [
            {
              label: "GET",
              value: "GET",
            },
            {
              label: "POST",
              value: "POST",
            },
            {
              label: "PUT",
              value: "PUT",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
          ],
        },
        busData: {
          type: "string",
          title: "自定义查询参数",
          required: false,
          "x-decorator": "FormItem",
          "x-decorator-props": {
            tooltip: `
            支持函数: dayjs 
            `,
            feedbackText: `
             option = {
          startTime: dayjs().subtract(11, "month").startOf("month").valueOf(),
          endTime: dayjs().endOf("month").valueOf()
             }
            `,
          },
          "x-component": "JsonInput",
          "x-component-props": {
            height: "300px",
            language: "javascript",
          },
        },
        headers: {
          type: "string",
          title: "自定义请求头",
          required: false,
          "x-decorator": "FormItem",
          "x-decorator-props": {
            feedbackText: `
            {"system-id":"237718173535821884"}
            `,
          },
          "x-component": "JsonInput",
          "x-component-props": {
            height: "200px",
          },
        },
      },
    },
  },
};

export const editJsonApiFormSchema: ISchema = {
  type: "object",
  properties: {
    card: {
      type: "void",
      "x-component": "Card",
      "x-component-props": {},
      properties: {
        name,
        description,
        groupName,

        content: {
          type: "string",
          title: "JSON数据",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "JsonInput",
          "x-component-props": {
            height: "500px",
          },
        },
      },
    },
  },
};

export const editJsApiFormSchema: ISchema = {
  type: "object",
  properties: {
    card: {
      type: "void",
      "x-component": "Card",
      "x-component-props": {},
      properties: {
        name,
        description,
        groupName,

        content: {
          type: "string",
          title: "JS脚本",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "MonacoEditor",
          "x-component-props": {
            height: "500px",
            theme: "dark",
            language: "javascript",
          },
        },
      },
    },
  },
};
