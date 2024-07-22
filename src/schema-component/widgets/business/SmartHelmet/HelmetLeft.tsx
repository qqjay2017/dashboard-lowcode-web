import Decimal from "decimal.js";
import { NumLabel } from "./NumLabel";
import {
  HelmetLeftBottompWrap,
  HelmetLeftTopWrap,
  HelmetLeftWrap,
} from "./style";
import type { SafetyProjectType } from "./types";
import { CountItem } from "./CountItem";

export function HelmetLeft({
  safetyProject,
}: {
  safetyProject: SafetyProjectType;
}) {
  return (
    <HelmetLeftWrap>
      <HelmetLeftTopWrap>
        <NumLabel
          label="应用项目数"
          showColon={false}
          value={`${Decimal.mul(safetyProject.applicationRate || 0, 100).toFixed(1)}%`}
        />
        <CountItem count={safetyProject.applicationItemNum} unit="个" />
      </HelmetLeftTopWrap>
      <HelmetLeftBottompWrap>
        <NumLabel
          label="监测人员数"
          showColon={false}
          value={`${Decimal.mul(safetyProject.monitoringRate || 0, 100).toFixed(1)}%`}
        />
        <CountItem count={safetyProject.monitoringPersonnelNum} unit="人" />
      </HelmetLeftBottompWrap>
    </HelmetLeftWrap>
  );
}
