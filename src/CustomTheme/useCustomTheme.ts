import { useContext } from "react";
import { CustomThemeContext, ThemeData } from "./CustomTheme";

export default function useCustomTheme(): ThemeData {
  return useContext(CustomThemeContext);
}
