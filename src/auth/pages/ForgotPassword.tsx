import React, { useState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) setError(error.message);
    else setSuccess(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      {success && <Alert severity="success">Password reset email sent.</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained">
        Send Reset Email
      </Button>
    </Box>
  );
};

export default ForgotPassword;

