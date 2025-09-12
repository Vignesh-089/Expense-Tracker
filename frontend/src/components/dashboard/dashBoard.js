import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Savings,
  Bolt,
  Add,
  TrackChanges,
  CreditCard,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashboardContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      navigate("/home", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        overflowY: "auto",
      }}
    >
      {/* Welcome Section */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome back!
        </Typography>
        <Typography color="text.secondary">
          Here's an overview of your financial activity this month
        </Typography>
      </Box>

      {/* Stats Cards Row */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize="0.875rem" fontWeight={500}>
                  Total Income
                </Typography>
                <TrendingUp fontSize="small" />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                $8,500.00
              </Typography>
              <Typography fontSize="0.75rem">+12.5% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize="0.875rem" fontWeight={500}>
                  Total Expenses
                </Typography>
                <TrendingDown fontSize="small" />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                $6,250.75
              </Typography>
              <Typography fontSize="0.75rem">+8.2% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize="0.875rem" fontWeight={500}>
                  Current Balance
                </Typography>
                <AttachMoney fontSize="small" />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                $2,249.25
              </Typography>
              <Typography fontSize="0.75rem">Available balance</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize="0.875rem" fontWeight={500}>
                  Savings Rate
                </Typography>
                <Savings fontSize="small" />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                26.5%
              </Typography>
              <Typography fontSize="0.75rem">
                Of total income saved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Content Grid Row (Charts + Actions) */}
      <Grid container spacing={3}>
        {/* Chart Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Box mb={3}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: "#3b82f6",
                      borderRadius: "50%",
                    }}
                  />
                  Monthly Financial Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comparative analysis of your income, expenses, and savings
                </Typography>
              </Box>

              {/* Legend */}
              <Grid container spacing={2} mb={2}>
                <Grid item xs={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#10b981",
                        borderRadius: "2px",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Total Income
                    </Typography>
                    <Typography fontWeight={600}>$49,100</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#ef4444",
                        borderRadius: "2px",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Total Expenses
                    </Typography>
                    <Typography fontWeight={600}>$34,750</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: "#3b82f6",
                        borderRadius: "2px",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Total Savings
                    </Typography>
                    <Typography fontWeight={600}>$14,350</Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Chart Placeholder */}
              <Box sx={{ height: 320, bgcolor: "grey.100", borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Actions Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Bolt sx={{ color: "#ec4899" }} />
                <Typography variant="h6" fontWeight={600}>
                  Quick Actions
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Common tasks to manage your finances
              </Typography>

              <Box display="flex" flexDirection="column" gap={1.5}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    bgcolor: "#10b981",
                    "&:hover": { bgcolor: "#059669" },
                    borderRadius: 1,
                  }}
                >
                  Add Transaction
                </Button>

                <Button
                  variant="contained"
                  startIcon={<TrackChanges />}
                  sx={{
                    bgcolor: "#3b82f6",
                    "&:hover": { bgcolor: "#2563eb" },
                    borderRadius: 1,
                  }}
                >
                  Set Budget
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Savings />}
                  sx={{
                    bgcolor: "#8b5cf6",
                    "&:hover": { bgcolor: "#6d28d9" },
                    borderRadius: 1,
                  }}
                >
                  Savings Goal
                </Button>

                <Button
                  variant="contained"
                  startIcon={<CreditCard />}
                  sx={{
                    bgcolor: "#f59e0b",
                    "&:hover": { bgcolor: "#d97706" },
                    borderRadius: 1,
                  }}
                >
                  Pay Bills
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
