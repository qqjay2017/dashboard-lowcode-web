import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { DashboardItem } from "../types";

import { useApp } from "../../application/hooks";

import { APiWrap } from "../../api-client/hooks";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { ColorTypeSelect } from "../../schema-settings/components/ColorTypeSelect";
import { IsDarkThemeSelect } from "./IsDarkThemeSelect";
import { dashboardRootWrap } from "../../schema-component";

interface FieldType extends DashboardItem {
  themeProvider: string;
  isDarkTheme: boolean;
}

export const CreateFormBtn = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const app = useApp();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setOpen(true);
        }}
      >
        新建
      </Button>
      <Modal
        open={open}
        width={700}
        title="新建"
        okText="确认"
        onOk={async () => {
          try {
            await form.validateFields();
            const { name, themeProvider, isDarkTheme, description } =
              form.getFieldsValue(true);
            const res = await app.apiClient.request<
              any,
              APiWrap<{ id: number }>
            >({
              url: `/huang-api/dashboard`,
              method: "POST",
              data: {
                userId: "123",
                name,
                description,
                content: JSON.stringify(
                  dashboardRootWrap({
                    "x-component-props": {
                      cols: 12,
                      rows: 12,
                      rowheight: 80,
                      designWidth: 1920,
                      designHeight: 1080,
                      breakpoints: {
                        showroom: 2600,
                        desktop: 1300,
                        tablet: 500,
                        mobile: 0,
                      },
                      themeProvider: themeProvider,
                      isDarkTheme: isDarkTheme,
                    },
                  })
                  // {
                  //   ...DashboardRoot.schema,
                  //   "x-component-props": {
                  //     cols: 12,
                  //     rows: 12,
                  //     rowheight: 80,
                  //     designWidth: 1920,
                  //     designHeight: 1080,
                  //     breakpoints: {
                  //       showroom: 2600,
                  //       desktop: 1300,
                  //       tablet: 500,
                  //       mobile: 0,
                  //     },
                  //     themeProvider: themeProvider,
                  //     isDarkTheme: isDarkTheme,
                  //   },
                  //   properties: {
                  //     a1: {
                  //       ...ClassicFrame.schema,

                  //       "x-decorator-props": {
                  //         w: 3,
                  //         h: 1.75,
                  //         x: 0,
                  //         y: 0,
                  //       },
                  //       properties: {
                  //         a11: {
                  //           "x-settings": "settings:block",
                  //           "x-decorator": "PositionDecorator",
                  //           _isJSONSchemaObject: true,
                  //           type: "void",
                  //           "x-component": "Hello",
                  //           "x-decorator-props": {
                  //             w: 1,
                  //             h: 1,
                  //             x: 0,
                  //             y: 0,
                  //           },
                  //         },
                  //       },
                  //     },
                  //     a2: {
                  //       ...ClassicFrame.schema,
                  //       "x-component-props": {
                  //         title: "今日现场",
                  //         extra: "Button",
                  //         extraProps: {
                  //           type: "primary",
                  //         },
                  //       },
                  //       "x-decorator-props": {
                  //         w: 3,
                  //         h: 4.6,
                  //         x: 0,
                  //         y: 1.6,
                  //       },
                  //       properties: {
                  //         a21: {
                  //           "x-settings": "settings:block",
                  //           "x-decorator": "PositionDecorator",
                  //           _isJSONSchemaObject: true,
                  //           type: "void",
                  //           "x-component": "Hello",
                  //           "x-decorator-props": {
                  //             w: 1,
                  //             h: 1,
                  //             x: 0,
                  //             y: 0,
                  //           },
                  //         },
                  //       },
                  //     },
                  //     a3: {
                  //       ...ClassicFrame.schema,
                  //       "x-decorator-props": {
                  //         w: 3,
                  //         h: 5.9,
                  //         x: 0,
                  //         y: 6.1,
                  //       },
                  //     },
                  //   },
                  // }
                ),
              },
            });
            const id = get(res, "data.data.id");
            console.log(id, "res");
            if (id) {
              navigate(`/design/${id}`);
            }
          } catch (error) {
            console.log(error, "error");
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "500px" }}
          initialValues={{
            themeProvider: "technologyBlue",
            isDarkTheme: true,
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="名称"
            name="name"
            rules={[{ required: true, message: "名称必输" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="主题颜色"
            name="themeProvider"
            rules={[{ required: true, message: "主题颜色必选" }]}
          >
            <ColorTypeSelect />
          </Form.Item>

          <Form.Item<FieldType>
            label="主题风格"
            name="isDarkTheme"
            rules={[{ required: true, message: "主题风格必选" }]}
          >
            <IsDarkThemeSelect />
          </Form.Item>
          <Form.Item<FieldType> label="描述" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
