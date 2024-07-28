function getCompomentTypeInfoSchema(properties = {}, properties2 = {}): any {
  return {
    type: "object",
    properties: {
      componentType: {
        type: "string",
        title: "组件类型",
        required: false,
        "x-decorator": "FormItem",
        "x-component": "ComponentAddressFormItem",
      },
      componentAddress: {
        type: "string",
        title: "组件路径",
        required: false,
        "x-decorator": "FormItem",
        "x-component": "ComponentTypeFormItem",
      },
      ...properties,
      dependencies: {
        type: "object",
        title: "查询",
        required: false,
        "x-decorator": "FormItem",
        "x-component": "DepFieldSetFormItem",
      },

      ...properties2,
    },
  };
}

export default getCompomentTypeInfoSchema;
