import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './auth/pages/SignIn';
import SignUp from './auth/pages/SignUp';
import ForgotPassword from './auth/pages/ForgotPassword';
import ResetPassword from './auth/pages/ResetPassword';
import ProtectedRoute from './routes/ProtectedRoute';
import AppShell from './pages/AppShell';

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/*" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;
