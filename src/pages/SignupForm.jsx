import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  Alert,
  Slide,
  CircularProgress,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import { Mail, Lock, Check, Eye, EyeOff, CheckCircle, Phone } from "lucide-react";

// API config
const API_BASE_URL = 'https://gmm-backend.onrender.com/api';

// Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// PhoneNumberInput Component with simpler validation
const PhoneNumberInput = ({ value, onChange, required = false, error = "", size = "medium" }) => {
  const [countryCode, setCountryCode] = useState('+91'); // Default to India's code
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Popular country codes
  const countryCodes = [
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+86', country: 'China' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+7', country: 'Russia' },
    { code: '+55', country: 'Brazil' },
  ];

  // Initialize from external value if provided
  useEffect(() => {
    if (value) {
      // Extract country code and phone number from the combined value
      // Look for a pattern like +XX followed by the phone number
      for (const country of countryCodes) {
        if (value.startsWith(country.code)) {
          setCountryCode(country.code);
          setPhoneNumber(value.substring(country.code.length));
          return;
        }
      }
      
      // If no matching country code is found, just keep the value as phone number
      setPhoneNumber(value);
    }
  }, []);

  // Simple validation - just check if required and has content
  const validatePhoneNumber = (number) => {
    if (!number.trim() && required) {
      setIsValid(false);
      setErrorMessage('Phone number is required');
      return false;
    }
    
    // Basic validation - just ensure it has digits
    if (number.trim() && !/^\d+$/.test(number)) {
      setIsValid(false);
      setErrorMessage('Phone number should contain only digits');
      return false;
    }
    
    setIsValid(true);
    setErrorMessage('');
    return true;
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    
    // Allow only digits
    const digits = input.replace(/\D/g, '');
    
    setPhoneNumber(digits);
    validatePhoneNumber(digits);
    
    // Update the parent component with the full number (country code + phone)
    if (onChange) {
      onChange(`${countryCode}${digits}`);
    }
  };

  // Handle country code change
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    
    // Update the parent component with the full number
    if (onChange) {
      onChange(`${e.target.value}${phoneNumber}`);
    }
  };

  const displayError = errorMessage || error;
  const hasError = !isValid || !!error;

  return (
    <Box className="w-full mb-2.5" >
      <Typography 
        variant="body2" 
        component="label" 
        className="block text-sm font-medium text-gray-700 mb-1" 
        htmlFor="phone"
      >
        Phone Number {required && <span className="text-red-500">*</span>}
      </Typography>
      
      <Box className="flex items-center">
        {/* Country code select */}
        <FormControl 
          variant="outlined" 
          size={size}
          sx={{
            minWidth: 120,
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px 0 0 6px",
              bgcolor: "rgba(0, 0, 0, 0.04)",
            }
          }}
        >
          <Select
            id="country-code"
            value={countryCode}
            onChange={handleCountryCodeChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderRight: 0,
              }
            }}
          >
            {countryCodes.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.code} ({country.country})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Phone number input */}
        <TextField
          id="phone"
          name="phone"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Phone number"
          variant="outlined"
          fullWidth
          size={size}
          error={hasError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone size={size === "small" ? 18 : 20} color="#666" />
              </InputAdornment>
            ),
            endAdornment: phoneNumber && (
              <InputAdornment position="end">
                {isValid ? (
                  <Check className="text-green-500" />
                ) : (
                  <IconButton
                    aria-label="error icon"
                    edge="end"
                    color="error"
                    size={size === "small" ? "small" : "medium"}
                    sx={{ padding: 0 }}
                  >
                    <CheckCircle className="text-red-500" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0 6px 6px 0",
            },
          }}
        />
      </Box>
      
      {/* Error message */}
      {hasError && displayError && (
        <FormHelperText error>{displayError}</FormHelperText>
      )}
      
      {/* Help text */}
      <FormHelperText className="text-gray-500">
        Please enter your phone number with country code
      </FormHelperText>
    </Box>
  );
};

const SignupForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Check for verification token in URL (when user clicks the email link)
  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = new URLSearchParams(location.search).get('token');
      
      if (token) {
        try {
          // Call the verification endpoint
          const response = await axios.get(`${API_BASE_URL}/register`, {
            params: { token },
            headers: { 'Content-Type': 'application/json' }
          });
          
          // Handle successful verification
          setSnackbarState({
            open: true,
            message: "Email verified successfully! You can now login.",
            severity: "success"
          });
          
          // Redirect to login page after successful verification
          setTimeout(() => {
            navigate('/gmm/login');
          }, 3000);
        } catch (error) {
          console.error("Verification error:", error);
          setSnackbarState({
            open: true,
            message: error.response?.data?.message || "Failed to verify email. Please try again.",
            severity: "error"
          });
        }
      }
    };
    
    verifyEmailToken();
  }, [location, navigate]);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    receiveUpdates: true,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  // Dialog state
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  
  // Snackbar for notifications
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info" // 'error', 'warning', 'info', 'success'
  });

  // Password requirement checks
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });

  // Check password strength and update requirements state
  useEffect(() => {
    if (formData.password) {
      const newRequirements = {
        minLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasLowercase: /[a-z]/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
          formData.password
        ),
      };

      setPasswordRequirements(newRequirements);

      // Check if all requirements are met
      const allRequirementsMet = Object.values(newRequirements).every(Boolean);
      setIsPasswordValid(allRequirementsMet);
    } else {
      setPasswordRequirements({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasSpecialChar: false,
      });
      setIsPasswordValid(false);
    }
  }, [formData.password]);

  // Check if passwords match whenever either password field changes
  useEffect(() => {
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordsMatch(false);
        setPasswordError("Passwords do not match");
      } else {
        setPasswordsMatch(true);
        setPasswordError("");
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear email error when email is changed
    if (name === "email") {
      setEmailError("");
    }
    
    // Clear mobile error when mobile is changed
    if (name === "mobileNumber") {
      setMobileError("");
    }
  };
  
  // Handle phone number change from PhoneNumberInput component
  const handlePhoneNumberChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mobileNumber: value,
    }));
    setMobileError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobile) => {
    // Simple validation - just check if it exists and has a reasonable format
    
    if (!mobile || mobile.trim() === "") {
      return false;
    }
    
    // Check if it has a country code (starts with +) and at least some digits
    if (mobile.startsWith('+')) {
      // Should have at least a few digits after the country code
      return mobile.length > 3 && /^\+\d+$/.test(mobile);
    }
    
    // If no country code, should be just digits
    return /^\d+$/.test(mobile);
  };

  const validateForm = () => {
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    
    if (!validateMobileNumber(formData.mobileNumber)) {
      setMobileError("Please enter a valid mobile number");
      isValid = false;
    } else {
      setMobileError("");
    }

    if (!isPasswordValid) {
      isValid = false;
    }

    if (!passwordsMatch) {
      isValid = false;
    }

    if (!formData.username) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Prepare data for API
        const userData = {
          username: formData.username,
          email: formData.email,
          phone: formData.mobileNumber,
          password: formData.password
        };
        
        // Call the registration API
        const response = await axios.post(`${API_BASE_URL}/register`, userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // Handle success
        setIsSubmitting(false);
        setVerificationDialogOpen(true);
        setVerificationSent(true);
        
      } catch (error) {
        console.error("Registration error:", error);
        setIsSubmitting(false);
        
        // Handle error response
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
        
        // Check for specific errors
        if (errorMessage.includes("already exists")) {
          setEmailError("An account with this email already exists");
        } else {
          setSnackbarState({
            open: true,
            message: errorMessage,
            severity: "error"
          });
        }
      }
    }
  };

  const handleResendVerification = async () => {
    setResendingVerification(true);
    
    try {
      // Call the resend verification API (you might need to implement this in your backend)
      await axios.post(`${API_BASE_URL}/resend-verification`, {
        email: formData.email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setSnackbarState({
        open: true,
        message: "Verification email has been resent successfully",
        severity: "success"
      });
    } catch (error) {
      console.error("Error resending verification:", error);
      setSnackbarState({
        open: true,
        message: "Failed to resend verification email. Please try again.",
        severity: "error"
      });
    } finally {
      setResendingVerification(false);
    }
  };

  const handleCloseVerificationDialog = () => {
    setVerificationDialogOpen(false);
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <div className="min-h-screen hatch w-full flex items-center justify-center bg-gray-50">
      <Box
        className="flex justify-center items-center min-h-screen w-full p-2 sm:p-3"
      >
        <Paper
          elevation={3}
          className="w-full max-w-[95%] sm:max-w-[480px] rounded-lg overflow-hidden mx-auto bg-white"
        >
          {/* Header Area */}
          <Box
            className="p-2.5 sm:p-3 bg-[#1a237e] text-white"
            sx={{
              backgroundImage: "linear-gradient(135deg, #1a237e 30%, #303f9f 90%)",
            }}
          >
            <Box
              className="w-[100px] sm:w-[128px] h-[36px] sm:h-[48px] bg-[rgba(255,255,255,0.15)] rounded mb-1"
            ></Box>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" className="mb-0.5">
              Create Account
            </Typography>
            <Typography variant="body2" className="opacity-80">
              Join our community today
            </Typography>
          </Box>

          {/* Form Content */}
          <Box className="p-2.5 sm:p-3">
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <Box className="mb-2.5">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.username}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box className="mb-2.5">
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  error={!!emailError}
                  helperText={emailError}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={isMobile ? 18 : 20} color="#666" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              {/* Phone Number Input - Using our simplified component */}
              <PhoneNumberInput 
                value={formData.mobileNumber}
                onChange={handlePhoneNumberChange}
                required={true}
                error={mobileError}
                size={isMobile ? "small" : "medium"}
              />

              {/* Password Field */}
              <Box className="mb-2.5">
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  error={formData.password && !isPasswordValid}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={isMobile ? 18 : 20} color="#666" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                        >
                          {showPassword ? (
                            <EyeOff size={isMobile ? 18 : 20} />
                          ) : (
                            <Eye size={isMobile ? 18 : 20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password Requirements */}
                {formData.password && (
                  <Box className="mt-1.5 mb-0.5 bg-[#f8f9fa] p-1.5 rounded">
                    <Typography 
                      variant="caption" 
                      fontWeight="medium" 
                      className="text-gray-600 block mb-1"
                    >
                      Password must have:
                    </Typography>
                    <List
                      dense
                      className="mt-0 mb-0 pt-0 pb-0 grid grid-cols-1 sm:grid-cols-2 gap-0.5"
                    >
                      <ListItem className="p-0 mb-0.5">
                        <ListItemIcon className="min-w-[28px]">
                          <CheckCircle
                            size={16}
                            color={passwordRequirements.minLength ? "#4caf50" : "#bdbdbd"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="At least 8 characters"
                          primaryTypographyProps={{
                            variant: "caption",
                            color: passwordRequirements.minLength
                              ? "success.main"
                              : "text.secondary",
                            fontSize: isMobile ? "0.7rem" : "0.75rem",
                          }}
                        />
                      </ListItem>
                      <ListItem className="p-0 mb-0.5">
                        <ListItemIcon className="min-w-[28px]">
                          <CheckCircle
                            size={16}
                            color={passwordRequirements.hasUppercase ? "#4caf50" : "#bdbdbd"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="At least one uppercase letter"
                          primaryTypographyProps={{
                            variant: "caption",
                            color: passwordRequirements.hasUppercase
                              ? "success.main"
                              : "text.secondary",
                            fontSize: isMobile ? "0.7rem" : "0.75rem",
                          }}
                        />
                      </ListItem>
                      <ListItem className="p-0 mb-0.5">
                        <ListItemIcon className="min-w-[28px]">
                          <CheckCircle
                            size={16}
                            color={passwordRequirements.hasLowercase ? "#4caf50" : "#bdbdbd"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="At least one lowercase letter"
                          primaryTypographyProps={{
                            variant: "caption",
                            color: passwordRequirements.hasLowercase
                              ? "success.main"
                              : "text.secondary",
                            fontSize: isMobile ? "0.7rem" : "0.75rem",
                          }}
                        />
                      </ListItem>
                      <ListItem className="p-0">
                        <ListItemIcon className="min-w-[28px]">
                          <CheckCircle
                            size={16}
                            color={passwordRequirements.hasSpecialChar ? "#4caf50" : "#bdbdbd"}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary="At least one special character"
                          primaryTypographyProps={{
                            variant: "caption",
                            color: passwordRequirements.hasSpecialChar
                              ? "success.main"
                              : "text.secondary",
                            fontSize: isMobile ? "0.7rem" : "0.75rem",
                          }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                )}
              </Box>

              {/* Confirm Password Field */}
              <Box className="mb-2.5">
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!passwordsMatch && formData.confirmPassword}
                  helperText={!passwordsMatch && formData.confirmPassword ? passwordError : ""}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Check size={isMobile ? 18 : 20} color="#666" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          size={isMobile ? "small" : "medium"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={isMobile ? 18 : 20} />
                          ) : (
                            <Eye size={isMobile ? 18 : 20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Checkbox for Updates */}
              <Box className="mb-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="receiveUpdates"
                      name="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onChange={handleChange}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                      sx={{ 
                        color: '#1a237e',
                        '&.Mui-checked': {
                          color: '#1a237e',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant={isMobile ? "caption" : "body2"} className="text-gray-600">
                      I want to receive updates via email
                    </Typography>
                  }
                />
              </Box>

              {/* Sign Up Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                className="py-1.5 rounded-md font-bold"
                sx={{
                  textTransform: "none",
                  borderRadius: 1.5,
                  boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)',
                  backgroundColor :"#1c0c3f"
                }}
                size={isMobile ? "medium" : "large"}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Login Link */}
              <Box className="mt-3 text-center">
                <Divider className="mb-2">
                  <Typography variant="caption" className="text-gray-500">
                    OR
                  </Typography>
                </Divider>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#1a237e] no-underline font-semibold"
                  >
                    Log In
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Paper>

        {/* Verification Dialog */}
        <Dialog
          open={verificationDialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseVerificationDialog}
          aria-labelledby="verification-dialog-title"
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: 2,
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle 
            id="verification-dialog-title"
            className="bg-[#1a237e] text-white py-2"
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              Verify Your Email
            </Typography>
          </DialogTitle>
          <DialogContent className="py-3 px-3">
            <Box className="text-center mb-2">
              <Box
                className="w-16 h-16 rounded-full bg-[#e8eaf6] flex items-center justify-center mx-auto mb-2"
              >
                <Mail size={32} color="#1a237e" />
              </Box>
              <Typography variant="body1" className="font-medium mb-1">
                Verification Link Sent
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                We've sent a verification link to <strong>{formData.email}</strong>. Please check your inbox and click the link to verify your account.
              </Typography>
            </Box>
            
            <Alert severity="info" className="mb-2">
              If you don't see the email in your inbox, please check your spam folder.
            </Alert>
            
            <Box className="text-center">
              <Button
                onClick={handleResendVerification}
                disabled={resendingVerification}
                startIcon={resendingVerification ? <CircularProgress size={16} /> : null}
                className="text-[#1a237e]"
                sx={{
                  textTransform: "none",
                }}
              >
                {resendingVerification ? "Sending..." : "Resend verification link"}
              </Button>
            </Box>
          </DialogContent>
          <DialogActions className="px-3 pb-3">
            <Button 
              onClick={handleCloseVerificationDialog}
              variant="outlined"
              className="text-[#1a237e] border-[#1a237e] hover:border-[#303f9f] hover:bg-[rgba(26,35,126,0.04)]"
              sx={{ 
                textTransform: "none",
                borderRadius: 1.5,
                px: 3,
              }}
            >
              Close
            </Button>
            <Button 
              component={Link}
              to="/gmm/login"
              variant="contained"
              className="bg-[#1a237e] text-white hover:bg-[#303f9f]"
              sx={{ 
                textTransform: "none",
                borderRadius: 1.5,
                px: 3,
              }}
            >
              Go to Login
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
    
    
  );
};

export default SignupForm;