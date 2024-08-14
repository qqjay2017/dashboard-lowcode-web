import { Button, Modal } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { css } from "@emotion/css";

import { observer } from "@formily/reactive-react";

import { createForm } from "@formily/core";
import { clone } from "@formily/shared";

import { Form, FormCollapse, FormItem } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import JsonInput from "../JsonInput";
import { ApiInfoSelectAll } from "./ApiInfoSelect";

import type { FormItemComponentProps } from "@/types";
import { useInnerVisible } from "@/designable/react/hooks";
import { jsTemplateTooltip } from "@/client-pages/pages/api/editApiFormSchema";

interface DataSourceBindProps extends FormItemComponentProps {}

const SchemaField = createSchemaField({
  components: {
    ApiInfoSelectAll,
    FormItem,
    FormCollapse,
    JsonInput,
  },
});

const DataSourceBind = observer((props: DataSourceBindProps) => {
  const { value } = props;

  const {
    modalVisible,

    innerVisible,

    closeModal,
    openModal,
  } = useInnerVisible();

  const form = useMemo(() => {
    return createForm({
      values: {
        apiInfo: clone(props.value),
        busData: clone(props.value?.busData || ""),
        headers: clone(props.value?.headers || ""),
      },
    });
  }, [modalVisible, props.value, innerVisible]);

  return (
    <>
      <Button block icon={<DatabaseOutlined />} onClick={openModal}>
        {value?.dataSourceName || "配置数据源"}
      </Button>
      {modalVisible && (
        <Modal
          open={modalVisible}
          width="70%"
          onOk={() => {
            form.submit((values) => {
              props.onChange?.({
                ...values.apiInfo,
                busData: values.busData,
                headers: values.headers,
              });
            });
            closeModal();
          }}
          onCancel={closeModal}
          title="配置数据源"
        >
          <div
            className={css`
              height: 70vh;
              overflow: hidden auto;
            `}
          >
            {innerVisible && (
              <Form form={form}>
                <SchemaField>
                  <SchemaField.Void
                    x-component="FormCollapse"
                    x-component-props={{
                      defaultActiveKey: ["apis"],
                      style: { marginBottom: 10 },
                    }}
                  >
                    <SchemaField.Void
                      x-component="FormCollapse.CollapsePanel"
                      x-component-props={{
                        key: "apis",
                        header: "选择接口",
                      }}
                    >
                      <SchemaField.Object
                        name="apiInfo"
                        x-decorator="FormItem"
                        x-component="ApiInfoSelectAll"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="FormCollapse.CollapsePanel"
                      x-component-props={{
                        key: "busData",
                        header: "自定义查询参数",
                      }}
                    >
                      <SchemaField.String
                        name="busData"
                        x-decorator="FormItem"
                        x-component="JsonInput"
                        x-decorator-props={{
                          tooltip: `
            支持函数: dayjs 
            `,
                          feedbackText: `
             option = {
          startTime: dayjs().subtract(11, "month").startOf("month").valueOf(),
          endTime: dayjs().endOf("month").valueOf()
             }
            `,
                        }}
                        x-component-props={{
                          height: "300px",
                          language: "javascript",
                        }}
                      />
                    </SchemaField.Void>

                    <SchemaField.Void
                      x-component="FormCollapse.CollapsePanel"
                      x-component-props={{
                        key: "headers",
                        header: "自定义请求头",
                      }}
                    >
                      <SchemaField.String
                        name="headers"
                        x-decorator="FormItem"
                        x-component="JsonInput"
                        x-decorator-props={{
                          tooltip: jsTemplateTooltip,
                          feedbackText: `
                            option = { "system-id": systemIds.zhgd }
            `,
                        }}
                        x-component-props={{
                          height: "200px",
                          language: "javascript",
                        }}
                      />
                    </SchemaField.Void>
                  </SchemaField.Void>
                </SchemaField>
              </Form>
            )}
          </div>
        </Modal>
      )}
    </>
  );
});

export default DataSourceBind;
