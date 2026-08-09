import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useLayoutEffect, useState } from "react";
export const ACCENT_THEMES = {
    prism: {
        key: "prism",
        option: "A",
        name: "幻彩黑",
        description: "纯黑、折射、流光",
        color: "#9d7bff",
        preview: "linear-gradient(135deg, #27e5ff, #7b61ff 32%, #ff4fc8 60%, #ffbd59 82%, #55f59b)",
        lightColor: "#7054d8",
        darkBackground: "#010103",
        darkContainer: "#09090e",
        darkBorder: "#29253b",
        darkSelected: "#1b1729",
        darkSelectedText: "#e7e1ff",
        lightSelected: "#f1edff",
    },
    midnight: {
        key: "midnight",
        option: "B",
        name: "星幕黑",
        description: "墨黑、深青、微光",
        color: "#2d8b98",
        preview: "linear-gradient(135deg, #010508 18%, #08151c 58%, #256d78)",
        lightColor: "#246d77",
        darkBackground: "#01060a",
        darkContainer: "#071018",
        darkBorder: "#142a33",
        darkSelected: "#0b2028",
        darkSelectedText: "#78b9c0",
        lightSelected: "#e8f8fa",
    },
};
const ThemeContext = createContext(null);
function readStoredTheme(storagePrefix, fallback) {
    const stored = localStorage.getItem(`${storagePrefix}-theme`);
    return stored === "dark" || stored === "light" ? stored : fallback;
}
function readStoredAccent(storagePrefix, fallback) {
    const stored = localStorage.getItem(`${storagePrefix}-accent`);
    return stored && stored in ACCENT_THEMES ? stored : fallback;
}
export function ThemeProvider({ children, storagePrefix = "prism", defaultTheme = "light", defaultAccent = "prism", }) {
    const [theme, setTheme] = useState(() => readStoredTheme(storagePrefix, defaultTheme));
    const [accent, setAccent] = useState(() => readStoredAccent(storagePrefix, defaultAccent));
    useLayoutEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        root.dataset.theme = theme;
        root.dataset.accent = accent;
        localStorage.setItem(`${storagePrefix}-theme`, theme);
        localStorage.setItem(`${storagePrefix}-accent`, accent);
    }, [accent, storagePrefix, theme]);
    return (_jsx(ThemeContext.Provider, { value: {
            theme,
            accent,
            setTheme,
            setAccent,
            toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
        }, children: children }));
}
export function useTheme() {
    const value = useContext(ThemeContext);
    if (!value)
        throw new Error("useTheme must be used within ThemeProvider");
    return value;
}
