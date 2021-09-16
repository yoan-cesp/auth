import {
  colors,
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
  useMediaQuery,
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
    primary: {
      main: "#2196f3",
    },
    secondary: colors.deepPurple,
    type: "dark",
    background: {
      default: "#f5f5f5",
    },
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
        prefersDarkMode: isDark,
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
    createTheme({
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
      if (isNewThemeDark) return createTheme({ palette: { type: "dark" } });

      return createTheme({
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
  theme: createTheme(initialThemeObject),
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
