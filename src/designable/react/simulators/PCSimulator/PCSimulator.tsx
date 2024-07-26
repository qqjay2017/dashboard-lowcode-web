import type { PropsWithChildren } from "react";
import cls from "classnames";
import { css } from "@emotion/css";

export interface IPCSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}
export const PCSimulator: React.FC<IPCSimulatorProps> = (props) => {
  return (
    <div
      {...props}
      className={css`
        background-color: var(--dn-pc-simulator-bg-color);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
      `}
    >
      {props.children}
    </div>
  );
};
