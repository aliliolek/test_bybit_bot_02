import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/sign-in', { replace: true });
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Profile</Typography>
      <Typography>{user?.email}</Typography>
      <Button variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Box>
  );
};

export default Profile;
