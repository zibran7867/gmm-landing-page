import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Collapse,
  Link,
  CircularProgress,
} from "@mui/material";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // Handle countdown for resend verification
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
    } else if (emailSent) {
      setCanResend(true);
    }
    
    return () => clearTimeout(timer);
  }, [resendCountdown, emailSent]);

  // Validate email on input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value) {
      validateEmail(value);
    } else {
      setEmailError("");
    }
  };

  // Strong email validation function
  const validateEmail = (email) => {
    // RFC 5322 compliant regex for email validation with some additional restrictions
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,30}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]{0,30}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
    
    if (!emailRegex.test(email)) {
      // Determine specific error message based on what's wrong
      if (!email.includes('@')) {
        setEmailError("Email must contain '@' symbol");
      } else if (!email.includes('.')) {
        setEmailError("Email must contain a domain (e.g., .com, .org)");
      } else if (email.indexOf('@') === 0) {
        setEmailError("Email must have characters before '@'");
      } else if (email.endsWith('@')) {
        setEmailError("Email must have a domain after '@'");
      } else if (!/^[a-zA-Z0-9]/.test(email)) {
        setEmailError("Email must start with a letter or number");
      } else if (!/\.[a-zA-Z]{2,}$/.test(email)) {
        setEmailError("Email must end with a valid domain (.com, .org, etc.)");
      } else {
        setEmailError("Please enter a valid email address");
      }
      return false;
    }
    
    setEmailError("");
    return true;
  };

  // Function to handle password reset request
  const handleResetRequest = () => {
    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }
    
    // Validate email before sending
    if (!validateEmail(email)) {
      setErrorMessage("Please correct the email format issues");
      return;
    }
    
    // Check if domain exists in common domains (simplified example)
    const domain = email.split('@')[1];
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'protonmail.com', 'mail.com'];
    const validTLDs = ['.com', '.org', '.net', '.edu', '.gov', '.co', '.io', '.me', '.info', '.biz'];
    
    // This is a simple check - in production, you'd use a more comprehensive check
    const hasTLD = validTLDs.some(tld => domain.endsWith(tld));
    if (!hasTLD) {
      setErrorMessage("Please enter an email with a valid domain extension");
      return;
    }
    
    setErrorMessage("");
    setIsLoading(true);
    
    // Simulate API call to send reset password email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      setResendCountdown(60); // 60 second cooldown before resend option
      console.log("Reset password email sent to:", email);
    }, 1500);
  };

  // Function to handle resend email
  const handleResendEmail = () => {
    setCanResend(false);
    setIsLoading(true);
    
    // Simulate API call to resend reset password email
    setTimeout(() => {
      setIsLoading(false);
      setResendCountdown(60); // Reset the countdown
      console.log("Reset password email resent to:", email);
    }, 1500);
  };

  // Function to go back to login
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full hatch flex justify-center items-center p-4">
      <Paper 
        elevation={3} 
        className="w-full max-w-md rounded-xl overflow-hidden"
        sx={{
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <Box 
          className="nblue p-6 text-white"
        >
          <Typography variant="h5" className="font-bold text-center">
            Reset Your Password
          </Typography>
          <Typography variant="body2" className="text-center mt-2 text-blue-100">
            Enter your email to receive a password reset link
          </Typography>
        </Box>

        <Box className="p-6">
          {!emailSent ? (
            <>
              {/* Error message */}
              <Collapse in={!!errorMessage}>
                <Alert 
                  severity="error" 
                  sx={{ mb: 3 }}
                  onClose={() => setErrorMessage("")}
                >
                  {errorMessage}
                </Alert>
              </Collapse>

              {/* Email Field */}
              <Box className="mb-6">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Email Address
                </Typography>
                <Box className="flex items-center relative">
                  <Mail 
                    size={20} 
                    className="absolute left-3 text-gray-500" 
                  />
                  <TextField
                    fullWidth
                    placeholder="Enter your registered email"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                    error={!!emailError}
                    helperText={emailError}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        paddingLeft: '40px',
                        borderRadius: '8px',
                      }
                    }}
                  />
                </Box>
                <Typography variant="caption" className="text-gray-500 mt-1 block">
                  Format: username@domain.com (e.g., john.doe@gmail.com)
                </Typography>
              </Box>

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleResetRequest}
                disabled={isLoading || !!emailError}
                className="mt-2"
                sx={{
                  borderRadius: '8px',
                  padding: '12px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 6px rgba(59, 130, 246, 0.25)',
                  backgroundColor: '#1c0c3f'
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Success message */}
              <Box className="text-center py-4">
                <CheckCircle 
                  size={64} 
                  className="mx-auto mb-4 text-green-500" 
                />
                <Typography variant="h6" className="font-medium mb-2">
                  Reset Link Sent!
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-6">
                  We've sent a password reset link to:
                  <br />
                  <span className="font-medium text-blue-600">{email}</span>
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  Please check your inbox and follow the instructions to reset your password. 
                  If you don't see it, please check your spam folder.
                </Typography>

                {/* Resend link */}
                <Box className="mt-4">
                  {canResend ? (
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleResendEmail}
                      className="text-blue-600 hover:text-blue-800"
                      underline="hover"
                    >
                      Didn't receive the email? Send it again
                    </Link>
                  ) : (
                    <Typography variant="body2" className="text-gray-500">
                      You can resend in {resendCountdown} seconds
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          )}

          {/* Back to login link */}
          <Box className="mt-6 text-center">
            <Button
              startIcon={<ArrowLeft size={16} />}
              onClick={handleBackToLogin}
              variant="text"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default ForgetPassword;