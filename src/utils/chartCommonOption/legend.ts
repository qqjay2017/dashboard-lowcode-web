export function getBottomCenterLegendConfig(
  {
    isDarkTheme = true,
    isScroll,
  }: {
    isDarkTheme?: boolean;
    isScroll?: boolean;
  } = { isDarkTheme: true }
) {
  return {
    itemWidth: 6,
    itemHeight: 6,
    left: isScroll ? 30 : "center",
    bottom: 24,
    icon: "rect",
    textStyle: {
      color: "#CAD0E0",
    },
    pageIconColor: isDarkTheme ? "#008DFA" : undefined,

    pageIconInactiveColor: isDarkTheme ? "rgba(202,208,224,0.4)" : undefined,
    pageTextStyle: {
      color: isDarkTheme ? "#fff" : "#333",
    },
    pageButtonItemGap: 15,
    pageIconSize: 10,
    width: "90%",
    type: isScroll ? "scroll" : undefined,

    right: isScroll ? 30 : undefined,
  };
}

export function getTopRightLegendConfig(
  {
    isDarkTheme = true,
    isScroll,
  }: {
    isDarkTheme?: boolean;
    isScroll?: boolean;
  } = { isDarkTheme: true }
) {
  return {
    ...getBottomCenterLegendConfig({
      isDarkTheme,
      isScroll,
    }),

    left: undefined,
    bottom: undefined,

    right: 16,
    top: 2,
  };
}
