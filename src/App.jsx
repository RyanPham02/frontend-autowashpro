import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import './i18n/config'; // Import i18n config

import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Services from './pages/Services';
import Customers from './pages/Customers';
import POS from './pages/POS';

// User Pages
import Home from './pages/user/Home';
import UserDashboard from './pages/user/UserDashboard';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const Placeholder = ({ title }) => (
  <div className="page-header">
    <h1>{title}</h1>
    <p>Chức năng đang được phát triển...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Nhánh 1: Hệ thống cho User */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="user" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Nhánh 2: Hệ thống cho Admin (Được bảo vệ) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="services" element={<Services />} />
            <Route path="customers" element={<Customers />} />
            <Route path="pos" element={<POS />} />
            <Route path="settings" element={<Placeholder title="Cài đặt hệ thống" />} />
          </Route>

          {/* Bắt các link lỗi */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
