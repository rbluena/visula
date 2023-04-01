type ThemeChoice = "dark" | "light";

const themeColors = {
  comment: {
    foreground: "808080",
  },
  string: {
    foreground: "1C82AD",
  },
  keywordModel: {
    foreground: "B3005E",
  },
  blocks: {
    foreground: "",
  },
  variable: {
    foreground: "000000",
  },
  errors: {
    foreground: "ff0000",
  },
  brackets: {
    foreground: "B3005E",
  },
};

export default function getColors(themeChoice?: ThemeChoice) {
  if (themeChoice === "dark") {
    themeColors.variable.foreground = "FFFFFF";
    return themeColors;
  }

  return themeColors;
}
