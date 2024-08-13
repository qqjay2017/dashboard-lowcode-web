export function getDefaultBackgroundColor(
  themeProvider = "",
  isDarkTheme?: boolean
) {
  if (themeProvider === "technologyBlue") {
    if (isDarkTheme) {
      return "rgba(0, 26, 58, 0.8)";
    }
  }
  return "";
}
