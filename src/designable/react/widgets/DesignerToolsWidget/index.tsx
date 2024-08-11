import React, { Fragment, useRef } from "react";
import { Button, InputNumber, Select } from "antd";
import { observer } from "@formily/reactive-react";
import cls from "classnames";

import { useViewport } from "../../hooks";
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
              label: "20%",
              value: 0.2,
            },
            {
              label: "30%",
              value: 0.3,
            },
            {
              label: "40%",
              value: 0.4,
            },
            {
              label: "50%",
              value: 0.5,
            },
            {
              label: "60%",
              value: 0.6,
            },
            {
              label: "70%",
              value: 0.7,
            },
            {
              label: "80%",
              value: 0.8,
            },
            {
              label: "90%",
              value: 0.9,
            },
            {
              label: "100%",
              value: 1,
            },
            {
              label: "110%",
              value: 1.1,
            },
            {
              label: "120%",
              value: 1.2,
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
