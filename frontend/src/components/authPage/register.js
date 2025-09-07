import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  // Grid,
  //   useTheme,
  //   useMediaQuery
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountBalance,
  // TrendingUp,
  // PieChart as PieChartIcon,
  // AttachMoney,
  //   CreditCard,
  Google
} from '@mui/icons-material';
import './AnimatedBg.css';
import { useNavigate } from 'react-router-dom';

const ExpenseTrackerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogin = () => {
    navigate("/logIn")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Registration data:', Object.fromEntries(formData));
    alert('Registration form submitted! Check console for data.');
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #faf5ff 0%, #eff6ff 50%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 🔹 Animated Background Layer */}
      <div className="animated-bg">
        {/* Floating Icons */}
        <div className="floating-icon" style={{ color: '#4ade80' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#60a5fa' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#a78bfa' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#f472b6' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#818cf8' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#fb923c' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#34d399' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="floating-icon" style={{ color: '#22d3ee' }}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
          </svg>
        </div>

        {/* Chart Bars */}
        <div className="chart-bars">
          <div className="chart-bar"></div>
          <div className="chart-bar"></div>
          <div className="chart-bar"></div>
          <div className="chart-bar"></div>
          <div className="chart-bar"></div>
        </div>

        {/* Floating Amounts */}
        <div className="floating-amounts amount-1">$1,234</div>
        <div className="floating-amounts amount-2">$567.89</div>
        <div className="floating-amounts amount-3">$2,345</div>
        <div className="floating-amounts amount-4">$89.99</div>
        <div className="floating-amounts amount-5">$999.00</div>

        {/* Credit Card */}
        <div className="credit-card">
          <div style={{ position: 'absolute', top: 16, left: 8, width: 32, height: 4, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }}></div>
          <div style={{ position: 'absolute', top: 24, left: 8, width: 24, height: 4, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }}></div>
        </div>

        {/* Pie Chart */}
        <div className="pie-chart"></div>

        {/* Particles */}
        <div className="particles particle-red"></div>
        <div className="particles particle-blue"></div>
        <div className="particles particle-green"></div>
        <div className="particles particle-yellow"></div>
        <div className="particles particle-purple"></div>
        <div className="particles particle-pink"></div>
      </div>
      {/* Background Overlays */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)'
      }} />
      <Box sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.2) 0%, transparent 50%, rgba(134, 239, 172, 0.2) 100%)'
      }} />

      {/* Main Content */}
      <Box sx={{ width: '100%', maxWidth: 448, position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Box sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #4f46e5 100%)',
              borderRadius: 2,
              p: 2,
              boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.25)'
            }}>
              <AccountBalance sx={{ color: 'white', fontSize: 24 }} />
            </Box>
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: 25,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #4f46e5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 0
            }}
          >
            Expense Tracker
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontSize: 14 }}>
            Take control of your finances today
          </Typography>
        </Box>

        {/* Registration Card */}
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(147, 51, 234, 0.2)',
            borderRadius: 3,
            boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.1)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
            p: 1,
            textAlign: 'center'
          }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: 22,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 0.5,
                mt: 2
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: 12 }}>
              Join thousands who are mastering their money
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Full Name */}
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 40, // <-- adjust overall height
                    fontSize: 14,
                    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.025) 0%, rgba(59, 130, 246, 0.025) 100%)',
                    '& fieldset': {
                      borderColor: '#c4b5fd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#a855f7',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#a855f7',
                      boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.3)',
                    },
                  },
                }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email Address"
                size="small"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 40, // <-- adjust overall height
                    fontSize: 14,
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.025) 0%, rgba(79, 70, 229, 0.025) 100%)',
                    '& fieldset': {
                      borderColor: '#bfdbfe',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                    },
                  },
                }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                size="small"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 40, // <-- adjust overall height
                    fontSize: 14,
                    background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.025) 0%, rgba(5, 150, 105, 0.025) 100%)',
                    '& fieldset': {
                      borderColor: '#a7f3d0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#10b981',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#10b981',
                      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.3)',
                    },
                  },
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                size="small"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 40, // <-- adjust overall height
                    fontSize: 14,
                    background: 'linear-gradient(90deg, rgba(249, 115, 22, 0.025) 0%, rgba(245, 158, 11, 0.025) 100%)',
                    '& fieldset': {
                      borderColor: '#fed7aa',
                    },
                    '&:hover fieldset': {
                      borderColor: '#f97316',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f97316',
                      boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.3)',
                    },
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  py: 1,       // reduced padding
                  fontSize: 14, // smaller text
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #4f46e5 100%)',
                  color: 'white',
                  fontWeight: 500,
                  boxShadow: '0 6px 15px -4px rgba(139, 92, 246, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #3730a3 100%)',
                    transform: 'scale(1.01)',
                  },
                }}
              >
                Create Account
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ position: 'relative', my: 3 }}>
              <Divider />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  px: 1,
                  fontSize: 12,
                  color: '#6b7280'
                }}
              >
                OR
              </Box>
            </Box>

            {/* Google Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{
                py: 1,
                fontSize: 14,
                fontWeight: 600,
                border: '2px solid transparent',
                borderImage: 'linear-gradient(90deg, #f87171, #ec4899, #6366f1) 1',
                color: '#374151',
                background: 'white',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #f87171, #ec4899, #6366f1)',
                  color: 'white',
                  border: '2px solid transparent',
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
                },
              }}
            >
              Continue with Google
            </Button>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: 14 }}>
                Already have an account?{' '}
                <Button
                  sx={{
                    background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 500,
                    p: 0,
                    minWidth: 'auto'
                  }}
                  onClick={handleLogin}
                >
                  Log in
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Features */}
        {/* <Grid container spacing={2} sx={{ mt: 4, textAlign: 'center' }}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4ade80 0%, #10b981 100%)',
                  boxShadow: '0 10px 25px -5px rgba(74, 222, 128, 0.25)'
                }}
              >
                <TrendingUp sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                Track Expenses
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%)',
                  boxShadow: '0 10px 25px -5px rgba(96, 165, 250, 0.25)'
                }}
              >
                <PieChartIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                Visual Reports
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                  boxShadow: '0 10px 25px -5px rgba(167, 139, 250, 0.25)'
                }}
              >
                <AttachMoney sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                Budget Goals
              </Typography>
            </Box>
          </Grid>
        </Grid> */}
      </Box>
    </Container>
  );
};

export default ExpenseTrackerRegistration;