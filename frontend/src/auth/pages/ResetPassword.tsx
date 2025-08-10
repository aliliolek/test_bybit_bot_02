import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../AuthProvider';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.startsWith('#') ? location.hash.slice(1) : '');
  const type = searchParams.get('type') || hashParams.get('type');

  useEffect(() => {
    if (type !== 'recovery' && user) {
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        navigate(redirectPath, { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
    }
  }, [type, user, navigate]);

  const validate = () => {
    let valid = true;
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword !== password) {
      setConfirmError('Passwords do not match');
      valid = false;
    } else {
      setConfirmError('');
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/auth/sign-in', { replace: true }), 1500);
    }
    setLoading(false);
  };

  if (type !== 'recovery') {
    return null;
  }

  return (

    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
      >
        {success && <Alert severity="success">Password updated.</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          error={!!confirmError}
          helperText={confirmError}
        />
        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          Set Password
        </Button>
      </Box>

    </Box>
  );
};

export default ResetPassword;
