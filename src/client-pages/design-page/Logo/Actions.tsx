import { observer } from "@formily/reactive-react";
import { Button, Radio, Space } from "antd";
import { useEffect } from "react";

export const Actions = observer(() => {
  useEffect(() => {
    // if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
    //   GlobalRegistry.setDesignerLanguage("zh-cn");
    // }
  }, []);

  return (
    <Space style={{ marginRight: 10 }}>
      <Button>保存</Button>
      <Button type="primary">发布</Button>
    </Space>
  );
});
