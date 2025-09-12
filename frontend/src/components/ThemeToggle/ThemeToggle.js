import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeContext";
import { useTheme } from "@mui/material/styles";

export default function ThemeToggle() {
    const { toggleMode } = useThemeMode();
    const theme = useTheme();

    return (
        <IconButton
            onClick={toggleMode}
            sx={{
                color: theme.palette.primary.main, // <-- Change button color
                bgcolor: theme.palette.action.hover,
                "&:hover": {
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                },
            }}
        >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
}