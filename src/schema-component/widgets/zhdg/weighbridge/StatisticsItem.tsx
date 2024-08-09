import { css } from "@emotion/css";
import { useDashboardRoot } from "@/schema-component/hooks";
import { cx } from "@/utils";

export interface StatisticsItemProps {
  label?: string;
  value?: string | number;
  unit?: string;
  color?: string;
  className?: string;
}
export default function StatisticsItem({
  label = "",
  value = 0,
  unit = "",
  color = "#FFFFFF",
  className,
}: StatisticsItemProps) {
  const { isPc } = useDashboardRoot();
  return (
    <div
      className={cx(
        css`
          font-size: ${isPc ? "0.14rem" : "0.28rem"};
          color: rgba(202, 208, 224, 0.7);
          font-weight: 400;
          display: flex;
          align-items: center;
        `,
        className
      )}
    >
      <div
        className={css`
          color: rgba(202, 208, 224, 0.7);
        `}
      >
        {label}：
      </div>
      <div
        className={css`
          color: ${color};
        `}
      >
        {value}
        {unit}
      </div>
    </div>
  );
}
