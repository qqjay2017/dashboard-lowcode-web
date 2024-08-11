import React, { Fragment, useRef } from "react";
import { Button, InputNumber, Select } from "antd";
import { observer } from "@formily/reactive-react";
import cls from "classnames";

import { useViewport, useWorkbench } from "../../hooks";
import IconWidget from "@/designable/react/widgets/IconWidget";

import "./styles.less";

type DesignerToolsType = "HISTORY" | "CURSOR" | "SCREEN_TYPE";

export interface IDesignerToolsWidgetProps {
  className?: string;
  style?: React.CSSProperties;
  use?: DesignerToolsType[];
}

export const DesignerToolsWidget: React.FC<IDesignerToolsWidgetProps> =
  observer((props) => {
    const viewport = useViewport();
    const workbench = useWorkbench();
    //   if (workbench.type === "DESIGNABLE") {
    //   return render();
    // }
    const use = props.use || ["HISTORY", "CURSOR", "SCREEN_TYPE"];

    const prefix = "dn-designer-tools";
    const renderHistoryController = () => {
      if (!use.includes("HISTORY")) return null;
      return null;

      // <Button.Group size="small" style={{ marginRight: 20 }}>
      //   <Button
      //     size="small"
      //     disabled={!history?.allowUndo}
      //     onClick={() => {
      //       history.undo();
      //     }}
      //   >
      //     <IconWidget infer="Undo" />
      //   </Button>
      //   <Button
      //     size="small"
      //     disabled={!history?.allowRedo}
      //     onClick={() => {
      //       history.redo();
      //     }}
      //   >
      //     <IconWidget infer="Redo" />
      //   </Button>
      // </Button.Group>
    };

    const renderScaleController = () => {
      if (workbench.type !== "DESIGNABLE") {
        return null;
      }
      return (
        <Select
          style={{
            width: 100,
          }}
          value={`${viewport.designScale * 100}%`}
          onChange={(e) => {
            viewport.designScale = Number(e || 1);
          }}
          size="small"
          options={[
            {
              label: "25%",
              value: 0.25,
            },
            {
              label: "50%",
              value: 0.5,
            },
            {
              label: "75%",
              value: 0.75,
            },

            {
              label: "100%",
              value: 1,
            },

            {
              label: "125%",
              value: 1.25,
            },
          ]}
        />
      );
    };

    return (
      <div style={props.style} className={cls(prefix, props.className)}>
        {/* {renderHistoryController()} */}
        {renderScaleController()}
      </div>
    );
  });
