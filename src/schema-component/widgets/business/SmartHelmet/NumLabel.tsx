import { NumLabelLabel, NumLabelValue, NumLabelWrap } from "./style";
import { cx, ellipTextStyle } from "@/utils";

export function NumLabel({
  label,
  value,
  numColor,
  showColon = true,
}: {
  label: string;
  value?: string | number;
  numColor?: string;
  showColon?: boolean;
}) {
  return (
    <NumLabelWrap>
      <NumLabelLabel className={cx(ellipTextStyle)}>
        {label}
        {`${showColon ? ":" : ""}`}
      </NumLabelLabel>
      <NumLabelValue
        style={
          numColor
            ? {
                color: numColor,
              }
            : {}
        }
      >
        {value}
      </NumLabelValue>
    </NumLabelWrap>
  );
}
