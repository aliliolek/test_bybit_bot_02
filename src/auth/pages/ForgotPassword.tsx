import React, { useState } from 'react';
import { Alert, Box, Button, Link, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_SITE_URL}/auth/reset-password`,
    });
    if (error) setError(error.message);
    else setSuccess(true);
    setLoading(false);
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
      <Button type="submit" variant="contained" disabled={loading}>
        Send Reset Email
      </Button>
      <Link component={RouterLink} to="/auth/sign-in" textAlign="center">
        Back to Sign In
      </Link>
    </Box>
  );
};

export default ForgotPassword;
