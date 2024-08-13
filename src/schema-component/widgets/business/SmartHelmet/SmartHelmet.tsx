import { get } from "lodash-es";
import { css } from "@emotion/css";

import { HelmetLeft } from "./HelmetLeft";
import { HelmetRight } from "./HelmetRight";
import type { ApplicationAnalysiItem, SafetyProjectType } from "./types";

import type { SchemComponentWithDataSourceProps } from "@/types";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

function SmartHelmetMain({ busDataRes }: SchemComponentWithDataSourceProps) {
  const safetyProject: SafetyProjectType = get(busDataRes, "safetyProject", {});
  const applicationAnalysis: ApplicationAnalysiItem[] =
    get(busDataRes, "applicationAnalysis", []) || [];

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      <HelmetLeft safetyProject={safetyProject} />
      <HelmetRight applicationAnalysis={applicationAnalysis} />
    </div>
  );
}

export const SmartHelmet = injectApiInfo(SmartHelmetMain);
