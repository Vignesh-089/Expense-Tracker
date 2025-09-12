import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeModeContext = createContext();

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

export function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
            mode,
        }),
        [mode]
    );
    const theme = useMemo(
        () => createTheme({ palette: { mode } }),
        [mode]
    );
    return (
        <ThemeModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeModeContext.Provider>
    );
}