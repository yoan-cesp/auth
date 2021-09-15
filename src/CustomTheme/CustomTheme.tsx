import {
  colors,
  createMuiTheme,
  Theme,
  useMediaQuery,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core";
import React, { FC, ReactNode, useCallback, useState } from "react";

type ThemePreferenceObject = { prefersDarkMode: boolean };
type ThemeType = "dark" | "light";

export type ThemeData = {
  theme: Theme;
  toggleTheme: () => void;
};

const initialThemeObject: ThemeOptions = {
  palette: {
    primary: colors.pink,
    secondary: colors.deepPurple,
    type: "dark",
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
  },
};

class LocalTheme {
  static themeKey = "prefersDarkMode";

  static setLocalTheme(isDark: boolean) {
    if ("localStorage" in window) {
      const themePreferenceObject: ThemePreferenceObject = {
        prefersDarkMode: isDark === true,
      };
      localStorage.setItem(
        this.themeKey,
        JSON.stringify(themePreferenceObject)
      );
    }
  }

  static getLocalTheme(): ThemeType {
    if ("localStorage" in window) {
      const themePreferenceString = localStorage.getItem(this.themeKey);
      if (themePreferenceString) {
        try {
          const themePreferenceParsed = JSON.parse(
            themePreferenceString
          ) as ThemePreferenceObject;
          return themePreferenceParsed.prefersDarkMode ? "dark" : "light";
        } catch {
          return "light";
        }
      }
    }
    return "light";
  }
}

function usePrefersDarkMode(): boolean {
  const [prefersDarkMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)") ||
      LocalTheme.getLocalTheme() === "dark"
  );
  return prefersDarkMode;
}

export function useCreateCustomTheme(): ThemeData {
  const prefersDarkMode = usePrefersDarkMode();
  const [theme, setTheme] = useState<Theme>(
    createMuiTheme({
      ...initialThemeObject,
      palette: {
        ...initialThemeObject.palette,
        type: prefersDarkMode ? "dark" : "light",
      },
    })
  );

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const isNewThemeDark = currentTheme.palette.type !== "dark";
      LocalTheme.setLocalTheme(isNewThemeDark);
      if (isNewThemeDark) return createMuiTheme({ palette: { type: "dark" } });

      return createMuiTheme({
        palette: {
          type: "light",
        },
      });
    });
  }, []);

  return { theme, toggleTheme };
}

type Props = {
  children: ReactNode;
  theme: ThemeData;
};

export const CustomThemeContext = React.createContext<ThemeData>({
  theme: createMuiTheme(initialThemeObject),
  toggleTheme: () => {},
});

const CustomThemeProvider: FC<Props> = function CustomThemeProvider({
  children,
  theme,
}: Props) {
  return (
    <CustomThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme.theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
