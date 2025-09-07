// layout/MainLayout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../../components/sideBar/sideBar";
import Header from "../../components/header/header";

const MinimalLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  // match Sidebar widths
  const drawerWidth = 0;
  const drawerWidthCollapsed = 0;

  return (
    <Box sx={{ display: "flex", background: "rgb(238, 242, 246)", height: "100vh" }}>
      {/* Sidebar with controlled state */}
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

      <Box sx={{ flex: 3 }}>
        {/* Pass toggle fn to Header */}
        <Header onSidebarToggle={toggleSidebar} />

        {/* <DashboardContent /> */}

        {/* Main content shifts based on collapsed state */}
        <Box
          sx={{
            mt: { xs: "10px", md: "0px" }, // keep only small margin to clear header height
            ml: { xs: 0, md: collapsed ? `${drawerWidthCollapsed}px` : `${drawerWidth}px` },
            px: { xs: 2, md: 0 },
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MinimalLayout;
