import React, { useEffect, useState } from 'react';
import { 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton, 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  LinearProgress, 
  Fade, 
  Container,
  Link,
  Divider,
  CircularProgress,
  Zoom
} from '@mui/material';
import { 
  CheckCircle, 
  Cancel, 
  Visibility, 
  VisibilityOff, 
  LockReset, 
  MarkEmailRead, 
  Security,
  TaskAlt
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PasswordResetForm = () => {
  // Form states
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animated states
  const [animated, setAnimated] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  
  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  
  // Validation states
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    // Trigger initial animation after component mount
    setTimeout(() => {
      setAnimated(true);
    }, 300);
  }, []);

  useEffect(() => {
    // Check validations whenever password changes
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      match: password === confirmPassword && password !== ''
    });
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all validations pass
    const allValid = Object.values(validations).every(value => value === true);
    
    if (allValid) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setOpenDialog(true);
        // Start success animation in the dialog
        setTimeout(() => {
          setSuccessAnimation(true);
        }, 500);
      }, 1500);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRedirectToLogin = () => {
    navigate('/gmm/login');
  };

  const allValidationsPass = Object.values(validations).every(value => value === true);
  
  // Calculate password strength score (0-100)
  const passwordStrengthScore = Object.values(validations).filter(Boolean).length * 16.67;
  
  // Determine password strength label and color
  const getPasswordStrength = () => {
    if (passwordStrengthScore <= 33) return { label: 'Weak', color: '#f44336' };
    if (passwordStrengthScore <= 67) return { label: 'Medium', color: '#ff9800' };
    return { label: 'Strong', color: '#4caf50' };
  };
  
  const passwordStrength = getPasswordStrength();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {/* Header */}
          <Box 
            sx={{ 
              bgcolor: '#1b5e20', 
              p: 2, 
              textAlign: 'center',
              color: 'white'
            }}
          >
            <Typography variant="h5" component="h1" fontWeight="bold">
              Grow Money More
            </Typography>
          </Box>
          
          {/* Content */}
          <Box sx={{ p: 4 }}>
            {/* Animated email check icon */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 3 
              }}
            >
              <Zoom in={animated} timeout={500}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    bgcolor: '#e8f5e9', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <MarkEmailRead 
                    sx={{ 
                      fontSize: 40, 
                      color: '#4caf50',
                      opacity: animated ? 1 : 0,
                      transition: 'opacity 0.7s',
                      transitionDelay: '0.3s' 
                    }} 
                  />
                </Box>
              </Zoom>
            </Box>
            
            <Typography 
              variant="h5" 
              component="h2" 
              align="center" 
              gutterBottom 
              fontWeight="bold"
            >
              Email Verified!
            </Typography>
            
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ mb: 4 }}
            >
              Your email has been successfully verified. Please create a new password below.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {password.length > 0 && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={passwordStrengthScore} 
                      sx={{ 
                        flexGrow: 1, 
                        height: 8, 
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: passwordStrength.color
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                      {passwordStrength.label}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Paper 
                variant="outlined" 
                sx={{ 
                  mt: 2, 
                  mb: 3, 
                  p: 2, 
                  bgcolor: '#f5f5f5' 
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Password Requirements:
                </Typography>
                <List dense disablePadding>
                  {[
                    { key: 'length', label: 'Minimum 8 characters' },
                    { key: 'uppercase', label: 'At least one uppercase letter' },
                    { key: 'lowercase', label: 'At least one lowercase letter' },
                    { key: 'number', label: 'At least one number' },
                    { key: 'special', label: 'At least one special character' },
                    { key: 'match', label: 'Passwords match' }
                  ].map((req) => (
                    <ListItem key={req.key} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {validations[req.key] ? (
                          <CheckCircle fontSize="small" color="success" />
                        ) : (
                          <Cancel fontSize="small" color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={req.label} 
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          color: validations[req.key] ? 'success.main' : 'text.secondary' 
                        }} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                disabled={!allValidationsPass || isSubmitting}
                size="large"
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <LockReset />}
                sx={{ 
                  py: 1.5,
                  bgcolor: '#1b5e20',
                  '&:hover': {
                    bgcolor: '#2e7d32'
                  }
                }}
              >
                {isSubmitting ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>
          </Box>
          
          {/* Footer */}
          <Box>
            <Divider />
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © 2025 Grow Money More. All rights reserved.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mt: { xs: 1, sm: 0 } }}>
                <Link href="#" color="text.secondary" underline="hover" variant="body2">Help</Link>
                <Link href="#" color="text.secondary" underline="hover" variant="body2">Privacy</Link>
                <Link href="#" color="text.secondary" underline="hover" variant="body2">Terms</Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Success Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" align="center">Password Reset Successful</Typography>
        </DialogTitle>
        <DialogContent>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              py: 2
            }}
          >
            <Box 
              sx={{ 
                position: 'relative',
                width: 100,
                height: 100,
                mb: 2
              }}
            >
              <Fade in={successAnimation} timeout={800}>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    bgcolor: '#e8f5e9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: successAnimation ? 'scale(1)' : 'scale(0.5)',
                    transition: 'transform 0.5s ease-out'
                  }}
                >
                  <TaskAlt 
                    color="success" 
                    sx={{ 
                      fontSize: 60,
                      animation: successAnimation ? 'pulse 1.5s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(0.8)',
                          opacity: 0.8,
                        },
                        '50%': {
                          transform: 'scale(1.1)',
                          opacity: 1,
                        },
                        '100%': {
                          transform: 'scale(0.8)',
                          opacity: 0.8,
                        },
                      },
                    }} 
                  />
                </Box>
              </Fade>
            </Box>
            <Typography variant="h6" gutterBottom align="center">
              Email Successfully Verified
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Your password has been reset successfully. You can now use your new password to log in to your account.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Security fontSize="small" color="success" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Your account is now secure with your new password
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3, justifyContent: 'center' }}>
          <Button 
            onClick={handleRedirectToLogin} 
            variant="contained" 
            color="success"
            fullWidth
            size="large"
            sx={{ 
              py: 1,
              bgcolor: '#1b5e20',
              '&:hover': {
                bgcolor: '#2e7d32'
              }
            }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PasswordResetForm;