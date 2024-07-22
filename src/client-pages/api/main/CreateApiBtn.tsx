import { Button } from "antd";

import { useNavigate } from "react-router-dom";
import { FormDialogPortal } from "@/schema-component";

export const CreateApiBtn = () => {
  const navigate = useNavigate();
  return (
    <FormDialogPortal>
      <Button
        type="primary"
        onClick={() => {
          navigate("/dapi/edit");
        }}
      >
        新增API
      </Button>
    </FormDialogPortal>
  );
};
