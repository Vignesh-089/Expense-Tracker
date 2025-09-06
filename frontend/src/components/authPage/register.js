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
  Grid,
//   useTheme,
//   useMediaQuery
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountBalance,
  TrendingUp,
  PieChart as PieChartIcon,
  AttachMoney,
//   CreditCard,
  Google
} from '@mui/icons-material';

const ExpenseTrackerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
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
              fontSize: 30,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #4f46e5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1
            }}
          >
            Expense Tracker
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontSize: 16 }}>
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
            p: 3,
            textAlign: 'center'
          }}>
            <Typography 
              variant="h4" 
              sx={{
                fontSize: 24,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: 16 }}>
              Join thousands who are mastering their money
            </Typography>
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
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
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
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
                  py: 1.5,
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #4f46e5 100%)',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 500,
                  boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #3730a3 100%)',
                    transform: 'scale(1.02)',
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
                py: 1.5,
                border: '2px solid #fecaca',
                fontSize: 16,
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': {
                  background: 'linear-gradient(90deg, rgba(249, 168, 212, 0.05) 0%, rgba(251, 113, 133, 0.05) 100%)',
                  border: '2px solid #fecaca',
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
                >
                  Sign in
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Features */}
        <Grid container spacing={2} sx={{ mt: 4, textAlign: 'center' }}>
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
        </Grid>
      </Box>
    </Container>
  );
};

export default ExpenseTrackerRegistration;