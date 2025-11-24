import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicView } from './views/PublicView';
import { AdminView } from './views/AdminView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { UpdatePasswordView } from './views/UpdatePasswordView';
import { LandingView } from './views/LandingView';
import { DemoView } from './views/DemoView';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-white">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-display">
      <div className="noise-texture"></div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingView />} />
        <Route path="/demo" element={<DemoView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/update-password" element={<UpdatePasswordView />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminView />
            </ProtectedRoute>
          }
        />

        {/* Dynamic Public Profile Route (Must be last) */}
        <Route path="/:username" element={<PublicView />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;