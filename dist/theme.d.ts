import { type ReactNode } from "react";
export type ColorMode = "dark" | "light";
export type AccentTheme = "prism" | "midnight";
export type AccentThemeDefinition = {
    key: AccentTheme;
    option: string;
    name: string;
    description: string;
    color: string;
    preview: string;
    lightColor: string;
    darkBackground: string;
    darkContainer: string;
    darkBorder: string;
    darkSelected: string;
    darkSelectedText: string;
    lightSelected: string;
};
export declare const ACCENT_THEMES: Record<AccentTheme, AccentThemeDefinition>;
type ThemeContextValue = {
    theme: ColorMode;
    accent: AccentTheme;
    setTheme: (theme: ColorMode) => void;
    setAccent: (accent: AccentTheme) => void;
    toggleTheme: () => void;
};
export type ThemeProviderProps = {
    children: ReactNode;
    storagePrefix?: string;
    defaultTheme?: ColorMode;
    defaultAccent?: AccentTheme;
};
export declare function ThemeProvider({ children, storagePrefix, defaultTheme, defaultAccent, }: ThemeProviderProps): import("react").JSX.Element;
export declare function useTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=theme.d.ts.map