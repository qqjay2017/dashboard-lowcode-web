import { css } from "@emotion/css";

import type { ClassicFrameProps } from "../classic-frame/ClassicFrame";
import { useDashboardRoot, useFrameSizeStyle } from "@/schema-component/hooks";
import { cx } from "@/utils";
import { useComponentToken, useToken } from "@/schema-component/antd";

export interface IClassicFrame6Props extends ClassicFrameProps {}

function ClassicFrame6({ children, title }: IClassicFrame6Props) {
  const { isPc } = useDashboardRoot();
  const { headStyle, bodyStyle } = useFrameSizeStyle();

  const { border, nodeContentBg, nodeContentForeground } =
    useComponentToken("ClassicFrame6");
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        border: 1px solid ${border};
        background-color: ${nodeContentBg};
      `}
    >
      <div
        className={cx(css`
          font-size: ${isPc ? "0.16rem" : "0.28rem"};
          padding-left: 0.24rem;
          padding-top: 0.16rem;
          color: ${nodeContentForeground};
        `)}
        style={headStyle}
      >
        {title}
      </div>
      <div className={cx()} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
}

export default ClassicFrame6;
