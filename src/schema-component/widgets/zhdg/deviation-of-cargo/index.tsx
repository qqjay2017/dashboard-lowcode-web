import { css } from "@emotion/css";

import CargoTypeSelect from "./CargoTypeSelect";
import DeviationOfCargoChart from "./DeviationOfCargoChart";
import { useFrameSizeStyle } from "@/schema-component/hooks";

export default function DeviationOfCargo() {
  const { headStyle, bodyStyle } = useFrameSizeStyle();

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          display: flex;

          justify-content: flex-end;
          padding-top: 0.12rem;
          padding-right: 0.24rem;
        `}
        style={headStyle}
      >
        <CargoTypeSelect />
      </div>
      <div
        className={css`
          width: 100%;

          overflow: hidden hidden;
        `}
        style={bodyStyle}
      >
        <DeviationOfCargoChart />
      </div>
    </div>
  );
}
