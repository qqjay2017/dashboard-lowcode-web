import { createStyles } from "antd-style";
import { rs } from "@/utils";
import { removeBgValue } from "@/utils/removeBgValue";

export const useDashboardRootStyle = createStyles(
  (
    { css },
    {
      themeProvider,
      isDarkTheme,
      showBg,
      backgroundColor,
      backgroundImage,
    }: {
      themeProvider: string;
      isDarkTheme: boolean;
      showBg?: boolean;
      backgroundColor?: string;
      backgroundImage?: string;
    }
  ) => {
    // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
    const matched = String(backgroundImage).match(/url\(\s*([^)]+)\s*\)/);
    const hasCusBgImg = matched && matched[1] && matched[1].trim().length > 0;

    const darkImg = hasCusBgImg
      ? backgroundImage
      : `url( ${rs(
          `/dashboard-assets/dashboardRoot/${themeProvider}-dark/main-bg.png`
        )} )`;
    const lightImg = hasCusBgImg
      ? backgroundImage
      : `url( ${rs(
          `/dashboard-assets/dashboardRoot/${themeProvider}-light/main-bg.png`
        )} )`;
    if (isDarkTheme) {
      const darkColor = themeProvider === "technologyBlue" ? "#c3d4e5" : "#fff";
      if (!showBg) {
        return css`
          background-color: ${backgroundColor};
          background-image: ${backgroundImage};
          color: ${darkColor};
        `;
      }
      return css`
        background-color: ${backgroundColor};
        background-image: ${darkImg};
        color: ${darkColor};
      `;
    } else {
      if (!showBg) {
        return css`
          background-color: ${backgroundColor};
          background-image: ${backgroundImage};
          color: #000;
        `;
      }
      return css`
        background-color: ${backgroundColor};
        background-image: ${lightImg};
        color: #000;
      `;
    }
  }
);
