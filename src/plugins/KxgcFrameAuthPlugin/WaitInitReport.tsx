import { observer } from "@formily/react";

import type { PropsWithChildren } from "react";
import { useApp } from "@/application/hooks";

export const WaitInitReport = observer(({ children }: PropsWithChildren) => {
  const app = useApp();
  if (app.isInFrame && !app.initReportInFrame) {
    return null;
  }
  return children;
});
