import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
    Box,
    Avatar,
    alpha,
    Popover,
    Typography,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle"; // <-- Add this import

export default function Header({ onSidebarToggle, user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userName, setUserName] = useState(sessionStorage.getItem('name'));
    const [userEmail, setUserEmail] = useState(sessionStorage.getItem('email'));
    const navigate = useNavigate();

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/logIn");
    }

    const open = Boolean(anchorEl);

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
                        ml: "auto",
                    }}
                >
                    <ThemeToggle /> {/* <-- Dark/Light mode toggle button */}
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

                    {/* Avatar with popup */}
                    <Avatar
                        onClick={handleAvatarClick}
                        sx={{
                            width: 40,
                            height: 40,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        }}
                    >
                        {(userName || "U").charAt(0).toUpperCase()}
                    </Avatar>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        PaperProps={{
                            sx: {
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                minWidth: 280,
                            },
                        }}
                    >
                        {/* Header with gradient */}
                        <Box
                            sx={{
                                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                p: 3,
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 64,
                                    height: 64,
                                    fontSize: "1.25rem",
                                    fontWeight: 600,
                                    bgcolor: "rgba(255,255,255,0.25)",
                                }}
                            >
                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                                {userName || "User"}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {userEmail || "no-email@example.com"}
                            </Typography>
                        </Box>

                        {/* Info + Actions */}
                        <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2,
                                    color: "text.secondary",
                                }}
                            >
                                📱 {user?.mobile || "N/A"}
                            </Typography>

                            {/* Buttons */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        flex: 1,
                                        py: 1,
                                        textAlign: "center",
                                        borderRadius: 2,
                                        bgcolor: "grey.100",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                            color: "white",
                                        },
                                    }}
                                >
                                    <Typography variant="body2" fontWeight={500}>
                                        Profile
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        py: 1,
                                        textAlign: "center",
                                        borderRadius: 2,
                                        bgcolor: "error.main",
                                        color: "white",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                        "&:hover": { bgcolor: "error.dark" },
                                    }}
                                    onClick={handleLogOut}
                                >
                                    <Typography variant="body2" fontWeight={500}>
                                        Logout
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Popover>
                </Box>
            </Toolbar>
        </AppBar>
    );
}