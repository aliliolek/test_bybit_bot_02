import React, { useState } from 'react';
import { Alert, Box, Button, Link, Stack, TextField } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, type Location } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location } | undefined)?.from?.pathname || '/profile';

  const validate = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email');
      valid = false;
    } else {
      setEmailError('');
    }

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
    setSuccess(false);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${import.meta.env.VITE_SITE_URL}/auth/reset-password` },
    });
    if (error) {
      setError(error.message);
    } else if (data.session) {
      navigate(from, { replace: true });
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    sessionStorage.setItem('redirectPath', from);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${import.meta.env.VITE_SITE_URL}/auth/reset-password` },
    });
    if (error) setError(error.message);
  };

  return (

    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" px={2}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
      >
        {success && (
          <Alert severity="success">Check your email to confirm your account.</Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
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
          Sign Up
        </Button>
        <Button variant="outlined" onClick={handleGoogleSignUp} disabled={loading} fullWidth>
          Continue with Google
        </Button>
        <Stack direction="row" justifyContent="flex-end">
          <Link component={RouterLink} to="/auth/sign-in" state={{ from: location.state?.from }}>
            Sign In
          </Link>
        </Stack>
      </Box>

    </Box>
  );
};

export default SignUp;
