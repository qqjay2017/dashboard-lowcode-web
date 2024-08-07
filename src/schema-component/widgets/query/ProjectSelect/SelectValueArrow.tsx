import { css } from "@emotion/css";
import { cx } from "@/utils";

const arrowImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAYAAABIB77kAAAAAXNSR0IArs4c6QAAAO9JREFUSEu91M0RgjAQBeC3jh7UsQca4UAFlmIJhBIsxQo40Ag9OOpBx5XgEHAgPwsZuULyZcPbJfz5oc6r7nx6ES7ZluqYZygfnKwZx3RHZ71vC1Y3zsFQRKifK2SxUI1t3iiZkTSSSvdUUId1VcVCfzCzORRVV1Yg5MNrXIpOYhpgFN8rjYi6sPRAqg9NBNSHmdCYpC5AQ7AROPd6Q7FJUIpKMCsYikoxJ+hD9XvT1MOeYhQ6jbZpZVJq+8DWMm1b6QkiwLwVutI7OqCnsn7YBE7qqUrN0kAsuEJnpQJMDI6CJMRmgQYF4Eqj7U99ANQ/yn6JLeLZAAAAAElFTkSuQmCC`;

export default function SelectValueArrow({
  open,
  className,
}: {
  open?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        css`
          width: 0.14rem;
          height: 0.1rem;
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${arrowImg});
          position: absolute;
          right: 0.08rem;
          top: 50%;
          margin-top: -0.07rem;
          background-position: center;
          transform-origin: center center;

          transition: all 0.5s;
          transform: ${open ? "rotate(180deg)" : "rotate(0deg)"};
        `,
        className
      )}
    />
  );
}
