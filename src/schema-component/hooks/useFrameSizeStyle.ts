import type React from "react";
import { useMemo } from "react";

import { useDashboardRoot } from "./hooks";
import { sizeFormat } from "@/utils";

export function useFrameSizeStyle() {
  const { rowHeight } = useDashboardRoot();

  const headerHeight = useMemo(() => {
    return Math.max(sizeFormat(rowHeight * 0.5111, 2), 44);
  }, [rowHeight]);
  return {
    headStyle: {
      height: headerHeight,
      minHeight: "44px",
    } as React.CSSProperties,
    bodyStyle: {
      height: `calc( 100% - ${headerHeight}px )`,
    } as React.CSSProperties,
  };
}
