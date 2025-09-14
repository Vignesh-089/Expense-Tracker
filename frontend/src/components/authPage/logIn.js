import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountBalanceWallet,
  AttachMoney,
  TrendingUp,
  ArrowForward
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { showToast } from '../../utils/toast-Components';

// Keyframe animations
const backgroundShift = keyframes`
  0% { background: linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 58, 138), rgb(30, 41, 59)); }
  25% { background: linear-gradient(to bottom right, rgb(30, 41, 59), rgb(15, 23, 42), rgb(30, 58, 138)); }
  50% { background: linear-gradient(to bottom right, rgb(30, 58, 138), rgb(30, 41, 59), rgb(15, 23, 42)); }
  75% { background: linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 58, 138), rgb(30, 41, 59)); }
  100% { background: linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 58, 138), rgb(30, 41, 59)); }
`;

const overlayPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

const float1 = keyframes`
  0%, 100% { transform: translateY(-20px) translateX(-10px) rotate(0deg) scale(0.9); opacity: 0.7; }
  50% { transform: translateY(-60px) translateX(10px) rotate(5deg) scale(1.1); opacity: 1; }
`;

const float2 = keyframes`
  0%, 100% { transform: translateY(-20px) translateX(10px) rotate(-5deg) scale(0.9); opacity: 0.7; }
  50% { transform: translateY(-60px) translateX(-10px) rotate(0deg) scale(1.1); opacity: 1; }
`;

const float3 = keyframes`
  0%, 100% { transform: translateY(-20px) translateX(0px) rotate(0deg) scale(0.9); opacity: 0.7; }
  50% { transform: translateY(-60px) translateX(5px) rotate(-5deg) scale(1.1); opacity: 1; }
`;

const formFadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const AnimatedBackground = styled(Box)({
  position: 'fixed',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
});

const GradientBackground = styled(Box)({
  position: 'absolute',
  inset: 0,
  animation: `${backgroundShift} 20s infinite linear`,
});

const AnimatedOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top right, rgba(34, 211, 238, 0.1), transparent, rgba(139, 92, 246, 0.1))',
  animation: `${overlayPulse} 8s infinite`,
});

const FloatingElement = styled(Box)(({ animation, top, left, right, bottom, delay }) => ({
  position: 'absolute',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
  animation: animation,
  animationDelay: delay,
  top,
  left,
  right,
  bottom,
  zIndex: 1,
  '&:hover': {
    transform: 'scale(1.2) rotate(10deg)',
    transition: 'transform 0.3s ease',
  },
}));

const BarChart = styled(Paper)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.3)',
  backdropFilter: 'blur(12px)',
  borderRadius: '1rem',
  padding: '1rem',
  width: '12rem',
  border: '1px solid rgba(34, 211, 238, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: 'rgba(34, 211, 238, 0.4)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const ChartBar = styled(Box)(({ color, height, delay }) => ({
  width: '1rem',
  borderRadius: '0.25rem 0.25rem 0 0',
  animation: `barGrow 3s infinite`,
  animationDelay: delay,
  backgroundColor: color,
  height: height,
}));

const CircularProgress = styled(Paper)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.3)',
  backdropFilter: 'blur(12px)',
  borderRadius: '50%',
  padding: '1rem',
  width: '6rem',
  height: '6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(34, 197, 94, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.3)',
  backdropFilter: 'blur(12px)',
  borderRadius: '0.75rem',
  padding: '0.75rem',
  minWidth: '7.5rem',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: 'rgba(148, 163, 184, 0.4)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const FormContainer = styled(Box)({
  position: 'relative',
  zIndex: 10,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
});

const FormCard = styled(Paper)({
  background: 'rgba(30, 41, 59, 0.2)',
  backdropFilter: 'blur(12px)',
  borderRadius: '1.5rem',
  padding: '2rem',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  border: '1px solid rgba(148, 163, 184, 0.3)',
  transition: 'all 0.3s ease',
  animation: `${formFadeIn} 0.6s ease-out`,
  '&:hover': {
    borderColor: 'rgba(148, 163, 184, 0.5)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
});

const HeaderIcon = styled(Paper)(({ color }) => ({
  borderRadius: '1rem',
  padding: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: color,
  border: `1px solid ${color}80`, // 80 is hex for 50% opacity
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

const SubmitButton = styled(Button)({
  width: '100%',
  padding: '0.75rem',
  background: 'linear-gradient(to right, #0891b2, #2563eb, #7c3aed)',
  borderRadius: '1rem',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 500,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    background: 'linear-gradient(to right, #0e7490, #1d4ed8, #6d28d9)',
    transform: 'scale(1.02)',
    boxShadow: '0 8px 25px rgba(34, 211, 238, 0.25)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
});

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", user?.name || "");
        localStorage.setItem("email", user?.email || "");
      }

      console.log("Login successful:", res.data);
      showToast("success", "Login Successfully");

      navigate("/home");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Animated Background */}
      <AnimatedBackground>
        <GradientBackground />
        <AnimatedOverlay />

        {/* Floating Elements - Only show on desktop */}
        {!isMobile && (
          <>
            {/* Floating Bar Chart */}
            <FloatingElement
              animation={`${float1} 25s infinite`}
              top="2.5rem"
              left="2.5rem"
            >
              <BarChart>
                <Box sx={{ marginBottom: '0.75rem' }}>
                  <Typography variant="body2" sx={{ color: '#22d3ee', marginBottom: '0.5rem' }}>
                    Revenue: $12,500.00
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#f43f5e', marginBottom: '0.5rem' }}>
                    Expenses: $9,230.50
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#10b981', marginBottom: '0.5rem' }}>
                    Profit: $3,219.50
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>
                    Budget: $15,000.00
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#f59e0b' }}>
                    Savings: $2,100.25
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem', height: '4rem' }}>
                  <ChartBar color="#22d3ee" height="3rem" delay="0s" />
                  <ChartBar color="#10b981" height="2rem" delay="0.5s" />
                  <ChartBar color="#f59e0b" height="2.5rem" delay="1s" />
                  <ChartBar color="#8b5cf6" height="3.5rem" delay="1.5s" />
                  <ChartBar color="#f43f5e" height="1.5rem" delay="2s" />
                  <ChartBar color="#f97316" height="2.25rem" delay="2.5s" />
                </Box>
              </BarChart>
            </FloatingElement>

            {/* Floating Circular Progress */}
            <FloatingElement
              animation={`${float2} 18s infinite 2s`}
              top="5rem"
              right="5rem"
            >
              <CircularProgress>
                <Box sx={{
                  position: 'relative',
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    position: 'absolute',
                    fontSize: '0.75rem',
                    color: '#10b981'
                  }}>
                    75%
                  </Box>
                </Box>
              </CircularProgress>
            </FloatingElement>

            {/* Floating Metric Cards */}
            <FloatingElement
              animation={`${float3} 22s infinite 4s`}
              bottom="8rem"
              left="4rem"
            >
              <MetricCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <AccountBalanceWallet sx={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                  <Typography variant="body2" sx={{ color: 'rgb(148, 163, 184)' }}>
                    Q1
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  $12.5K
                </Typography>
              </MetricCard>
            </FloatingElement>

            {/* Additional floating elements would go here */}
          </>
        )}
      </AnimatedBackground>

      {/* Sign In Form */}
      <FormContainer>
        <Container maxWidth="sm">
          <FormCard>
            {/* Header Icons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <HeaderIcon color="#10b981">
                <AccountBalanceWallet sx={{ color: 'white', fontSize: '1.5rem' }} />
              </HeaderIcon>
              <HeaderIcon color="#8b5cf6">
                <AttachMoney sx={{ color: 'white', fontSize: '1.5rem' }} />
              </HeaderIcon>
              <HeaderIcon color="#22d3ee">
                <TrendingUp sx={{ color: 'white', fontSize: '1.5rem' }} />
              </HeaderIcon>
            </Box>

            {/* Form Header */}
            <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Typography variant="h4" component="h1" sx={{ color: 'white', marginBottom: '0.5rem' }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgb(148, 163, 184)' }}>
                Continue managing your expenses with ease
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSignIn}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                variant="outlined"
                sx={{ marginBottom: '1.5rem' }}
                InputProps={{
                  sx: {
                    color: 'white',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    borderRadius: '0.5rem',
                    '&:focus': {
                      backgroundColor: 'rgba(51, 65, 85, 0.7)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(71, 85, 105)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#22d3ee',
                    },
                  }
                }}
                InputLabelProps={{
                  sx: { color: 'rgb(203, 213, 225)' }
                }}
              />

              <TextField
                fullWidth
                required
                id="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                variant="outlined"
                sx={{ marginBottom: '1.5rem' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: 'rgb(148, 163, 184)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: 'white',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    borderRadius: '0.5rem',
                    '&:focus': {
                      backgroundColor: 'rgba(51, 65, 85, 0.7)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(71, 85, 105)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#22d3ee',
                    },
                  }
                }}
                InputLabelProps={{
                  sx: { color: 'rgb(203, 213, 225)' }
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      sx={{
                        color: '#22d3ee',
                        '&.Mui-checked': {
                          color: '#22d3ee',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'rgb(148, 163, 184)' }}>
                      Remember me
                    </Typography>
                  }
                />
                <Button
                  variant="text"
                  sx={{
                    color: '#22d3ee',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'rgb(103, 232, 249)',
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => alert('Forgot password functionality would be implemented here!')}
                >
                  Forgot password?
                </Button>
              </Box>

              <SubmitButton
                type="submit"
                variant="contained"
                endIcon={<ArrowForward />}
              >
                Sign In
              </SubmitButton>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body2" sx={{ color: 'rgb(148, 163, 184)' }}>
                Don't have an account?{' '}
                <Button
                  variant="text"
                  sx={{
                    color: '#22d3ee',
                    '&:hover': {
                      color: 'rgb(103, 232, 249)',
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={handleRegister}
                >
                  Create one now
                </Button>
              </Typography>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
              <Typography variant="caption" sx={{ color: 'rgb(148, 163, 184)' }}>
                © 2024 Expense Tracker. Secure financial management.
              </Typography>
            </Box>
          </FormCard>
        </Container>
      </FormContainer>

      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes barGrow {
            0%, 100% { height: var(--initial-height); }
            50% { height: calc(var(--initial-height) + 0.5rem); }
          }
        `}
      </style>
    </Box>
  );
};

export default LogIn;