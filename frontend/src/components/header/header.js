import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
    Box,
    Avatar,
    alpha,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";

export default function Header({ onSidebarToggle }) {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
                backdropFilter: "blur(8px)",
                height: "var(--header-height, 64px)",
                justifyContent: "center",
            }}
        >
            <Toolbar sx={{ display: "flex", gap: 2 }}>
                {/* Left Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={onSidebarToggle}
                        sx={{
                            width: 40,
                            height: 40,
                            color: "text.secondary",
                            "&:hover": {
                                bgcolor: "action.hover",
                                color: "text.primary",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Search Section */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: "28rem",
                        position: "relative",
                    }}
                >
                    <SearchIcon
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "0.75rem",
                            transform: "translateY(-50%)",
                            color: "text.disabled",
                        }}
                    />
                    <InputBase
                        placeholder="Search transactions, categories..."
                        sx={{
                            width: "100%",
                            pl: 4,
                            pr: 2,
                            py: 0.5,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "0.5rem",
                            bgcolor: "background.default",
                            fontSize: "0.875rem",
                            "&:focus-within": {
                                borderColor: "primary.main",
                                boxShadow: (theme) =>
                                    `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                            },
                        }}
                    />
                </Box>

                {/* Right Section */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        ml: "auto", // 👈 pushes this box to the far right
                    }}
                >
                    <IconButton
                        sx={{
                            width: 40,
                            height: 40,
                            color: "text.secondary",
                            "&:hover": {
                                bgcolor: "action.hover",
                                color: "text.primary",
                            },
                        }}
                    >
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        sx={{
                            width: 40,
                            height: 40,
                            color: "text.secondary",
                            "&:hover": {
                                bgcolor: "action.hover",
                                color: "text.primary",
                            },
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>

                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        }}
                    >
                        JD
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
