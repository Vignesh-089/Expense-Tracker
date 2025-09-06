import React from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Box,
    Tooltip,
} from "@mui/material";
import {
    Home,
    SyncAlt,
    PieChart,
    TrackChanges,
    CreditCard,
    ShowChart,
    Settings,
    Help,
    AccountBalanceWallet,
} from "@mui/icons-material";

const drawerWidth = 240;
const drawerWidthCollapsed = 70;

export default function Sidebar({ collapsed, onToggle }) {
    const menuItems = [
        { text: "Dashboard", icon: <Home />, active: true },
        { text: "Transactions", icon: <SyncAlt /> },
        { text: "Analytics", icon: <PieChart /> },
        { text: "Budgets", icon: <TrackChanges /> },
        { text: "Cards", icon: <CreditCard /> },
        { text: "Investments", icon: <ShowChart /> },
    ];

    const bottomItems = [
        { text: "Settings", icon: <Settings /> },
        { text: "Help", icon: <Help /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: collapsed ? drawerWidthCollapsed : drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: collapsed ? drawerWidthCollapsed : drawerWidth,
                    boxSizing: "border-box",
                    transition: "width 0.3s ease",
                    backgroundColor: "background.paper",
                    borderRight: "1px solid",
                    borderColor: "divider",
                    height: "100vh", // 👈 full height
                    display: "flex",
                    flexDirection: "column", // stack header, menu, bottom
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                        color: "white",
                        flexShrink: 0,
                    }}
                >
                    <AccountBalanceWallet />
                </Box>

                {!collapsed && (
                    <Box sx={{ overflow: "hidden" }}>
                        <Typography fontWeight={600} fontSize="0.9rem">
                            Expense Tracker
                        </Typography>
                        <Typography fontSize="0.75rem" color="text.secondary">
                            Personal Finance
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Navigation (scrollable only if needed) */}
            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <Typography
                    variant="caption"
                    sx={{
                        px: 2,
                        py: 1,
                        color: "text.secondary",
                        fontWeight: 600,
                        opacity: collapsed ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                >
                    Navigation
                </Typography>

                <List>
                    {menuItems.map((item, index) => (
                        <Tooltip
                            key={index}
                            title={collapsed ? item.text : ""}
                            placement="right"
                        >
                            <ListItemButton
                                selected={item.active}
                                sx={{
                                    borderRadius: 1,
                                    mx: 1,
                                    "&.Mui-selected": {
                                        backgroundColor: "action.selected",
                                        color: "text.primary",
                                        fontWeight: 500,
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                                {!collapsed && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Tooltip>
                    ))}
                </List>
            </Box>

            {/* Bottom Section (fixed at bottom) */}
            <Divider />
            <List>
                {bottomItems.map((item, index) => (
                    <Tooltip
                        key={index}
                        title={collapsed ? item.text : ""}
                        placement="right"
                    >
                        <ListItemButton sx={{ mx: 1, borderRadius: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                            {!collapsed && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    </Tooltip>
                ))}
            </List>
        </Drawer>
    );
}
