import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import P2P from './P2P';
import Orders from './Orders';
import Ads from './Ads';
import Profile from './Profile';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction label="P2P" value="/p2p" />
      <BottomNavigationAction label="Orders" value="/orders" />
      <BottomNavigationAction label="Ads" value="/ads" />
      <BottomNavigationAction label="Profile" value="/profile" />
    </BottomNavigation>
  );
};

const AppShell: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/p2p" replace />} />
        <Route path="/p2p" element={<P2P />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Navigation />
    </>
  );
};

export default AppShell;
