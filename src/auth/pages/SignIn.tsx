import React, { useState } from 'react';
import { Alert, Box, Button, Link, Stack, TextField } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, type Location } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    sessionStorage.setItem('redirectPath', from);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${import.meta.env.VITE_SITE_URL}/auth/reset-password` },
    });
    if (error) setError(error.message);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
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
      <Button type="submit" variant="contained" disabled={loading}>
        Sign In
      </Button>
      <Button variant="outlined" onClick={handleGoogleSignIn} disabled={loading}>
        Continue with Google
      </Button>
      <Stack direction="row" justifyContent="space-between">
        <Link component={RouterLink} to="/auth/sign-up" state={{ from: location.state?.from }}>
          Sign Up
        </Link>
        <Link component={RouterLink} to="/auth/forgot-password">
          Forgot Password?
        </Link>
      </Stack>
    </Box>
  );
};

export default SignIn;
