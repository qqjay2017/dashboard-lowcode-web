import type React from "react";
import { useMemo } from "react";
import { useDashboardRoot } from "../components";
import { sizeFormat } from "@/utils";

export const useFrameSizeStyle = () => {
  const { rowHeight } = useDashboardRoot();
  const headerHeight = useMemo(() => {
    return sizeFormat(rowHeight * 0.5111, 2);
  }, [rowHeight]);
  return {
    headStyle: {
      height: headerHeight,
    } as React.CSSProperties,
    bodyStyle: {
      height: `calc( 100% - ${headerHeight}px )`,
    } as React.CSSProperties,
  };
};
