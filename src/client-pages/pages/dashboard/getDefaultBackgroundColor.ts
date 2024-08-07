export function getDefaultBackgroundColor(
  themeProvider = "",
  isDarkTheme?: boolean
) {
  if (themeProvider === "technologyBlue") {
    if (isDarkTheme) {
      return "#0C1A32";
    }
  }
  return "";
}
