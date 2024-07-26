import { observer } from "@formily/reactive-react";
import { ComponentTreeWidget } from "./react/widgets";

export function Content() {
  return (
    <ComponentTreeWidget
      components={{
        Card: observer((props) => {
          return (
            <div
              {...props}
              style={{
                width: 200,
                height: 100,
                ...props.style,
                background: "#eee",
                border: "1px solid #ddd",
                display: "flex",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.children ? (
                props.children
              ) : (
                <span>拖拽字段进入该区域</span>
              )}
            </div>
          );
        }),
      }}
    />
  );
}
