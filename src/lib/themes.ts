// The themes this package ships, for a product that offers a picker. Each
// name is a value for `data-theme`; the CSS lives in styles/themes/. A theme a
// product adds itself is selected the same way and does not need to be here.
export const themes = [
  { name: "engine-magenta", label: "Engine Magenta", scheme: "dark" },
  { name: "engine-magenta-light", label: "Engine Magenta Light", scheme: "light" },
] as const

export type ThemeName = (typeof themes)[number]["name"]
