import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Typography, 
  Card, 
  CardContent, 
  Snackbar, 
  Alert, 
  Box
} from '@mui/material';
import { Copy, DollarSign, AlertTriangle, Dot } from 'lucide-react';

const DepositScreen = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [amountDialogOpen, setAmountDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState(null);

  // Deposit address (typically from props or context)
  const depositAddress = 'ANsjSusskja72820HSgw8w029Shsjwu8989S8s';

  const handleCopyAddress = () => {
    // Try multiple methods to ensure copy works across different devices
    const copyText = () => {
      // Method 1: Clipboard API
      if (navigator.clipboard) {
        navigator.clipboard.writeText(depositAddress)
          .then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
          })
          .catch(err => {
            fallbackCopyTextToClipboard();
          });
      } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard();
      }
    };

    const fallbackCopyTextToClipboard = () => {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea');
      textArea.value = depositAddress;
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        } else {
          console.error('Unable to copy');
        }
      } catch (err) {
        console.error('Fallback copy failed', err);
      }

      document.body.removeChild(textArea);
    };

    // On mobile, create a selection to trigger copy
    if (window.getSelection) {
      const range = document.createRange();
      const selection = window.getSelection();
      
      // Create a temporary span with the text
      const span = document.createElement('span');
      span.textContent = depositAddress;
      span.style.position = 'fixed';
      span.style.top = 0;
      span.style.left = 0;
      span.style.width = '2em';
      span.style.height = '2em';
      span.style.padding = 0;
      span.style.border = 'none';
      span.style.outline = 'none';
      span.style.boxShadow = 'none';
      span.style.background = 'transparent';

      document.body.appendChild(span);
      
      range.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(range);

      copyText();

      // Clean up
      selection.removeAllRanges();
      document.body.removeChild(span);
    } else {
      copyText();
    }
  };

  const handleSetAmount = () => {
    setAmountDialogOpen(true);
  };

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      setDepositAmount(parseFloat(amount));
      setAmountDialogOpen(false);
      setAmount('');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
    }} className='hatch'>
      <Card sx={{ 
        maxWidth: 400, 
        width: '100%', 
        borderRadius: 3, 
        boxShadow: 3 
      }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Deposit USDT (TRC20)
          </Typography>

          {/* QR Code Section */}
          <div style={{ 
            backgroundColor: '#f0f0f0', 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ 
              background: 'white', 
              padding: 16, 
              borderRadius: 8,
              marginBottom: 16
            }}>
              <QRCode 
                value={depositAddress} 
                size={200}
              />
            </div>

            <Typography 
              variant="body2" 
              sx={{ 
                wordBreak: 'break-all', 
                color: 'text.secondary', 
                mt: 2 
              }}
            >
              {depositAddress}
            </Typography>
          </div>

          {/* Deposit Amount Display */}
          {depositAmount !== null && (
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'success.main', 
                mb: 2, 
                fontWeight: 'bold' 
              }}
            >
              Deposit Amount: {depositAmount} USDT
            </Typography>
          )}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 16 
          }}>
            <Button 
              variant="contained" 
              startIcon={<Copy />} 
              onClick={handleCopyAddress}
              sx={{ flex: 1 , backgroundColor: '#1c0c3f'}}
            >
              Copy Address
            </Button>

            <Button 
              variant="outlined" 
              startIcon={<DollarSign />} 
              onClick={handleSetAmount}
              sx={{ flex: 1  }}
            >
              Set Amount
            </Button>
          </div>

          {/* Instrcutions */}
          <Card sx={{ 
  borderRadius: 3, 
  backgroundColor: '#f0f0f0', 
  marginTop: '0.8rem' 
}}>
  <CardContent 
    sx={{
      display: 'flex', 
      flexDirection: "column", 
      alignItems: 'start', 
      marginTop: '0.4rem',
      gap: 1
    }}
  >
    <Typography 
      variant='h6' 
      sx={{
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: '#d32f2f'
      }}
    > 
      <AlertTriangle color="#d32f2f" size={24} /> 
      Instructions
    </Typography>
    
    <Box sx={{ display: 'flex', alignItems: 'start', textAlign :'start', gap : 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666', fontSize : 13 }}>1.</Typography>
      <Typography variant='body2'  fontSize={13}>Only send USDT on the TRC20 network.</Typography>
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'start', textAlign :'start', gap : 1}}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666', fontSize : 13 }}>2.</Typography>
      <Typography variant='body2' fontSize={13}>Double-check the deposit address before sending.</Typography>
    </Box>
    
    <Box sx={{ display: 'flex', alignItems: 'start',  textAlign :'start', gap : 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666', fontSize : 13 }}>3.</Typography>
      <Typography variant='body2'  fontSize={13}>Sending to the wrong network may result in permanent loss of funds.</Typography>
    </Box>
  </CardContent>
</Card>

          {/* Amount Dialog */}
          <Dialog 
            open={amountDialogOpen} 
            onClose={() => setAmountDialogOpen(false)}
          >
            <DialogTitle>Set Deposit Amount</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Amount (USDT)"
                type="number"
                fullWidth
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{
                  startAdornment: <DollarSign size={20} />,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAmountDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleAmountSubmit} 
                color="primary" 
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* Copy Success Snackbar */}
          <Snackbar
            open={copySuccess}
            autoHideDuration={3000}
            onClose={() => setCopySuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={() => setCopySuccess(false)} 
              severity="success" 
              sx={{ width: '100%' }}
            >
              Address copied to clipboard
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositScreen;