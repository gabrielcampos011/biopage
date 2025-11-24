import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicView } from './views/PublicView';
import { AdminView } from './views/AdminView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { UpdatePasswordView } from './views/UpdatePasswordView';
import { LandingView } from './views/LandingView';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Types
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  visible: boolean;
}

export interface SocialItem {
  id: string;
  type: 'instagram' | 'twitter' | 'linkedin' | 'github' | 'email' | 'users';
  url: string;
}

export interface ProfileData {
  username: string;
  role: string;
  avatarUrl: string;
}

export interface AppState {
  profile: ProfileData;
  links: LinkItem[];
  socials: SocialItem[];
}

// Initial Data Mock (Mantido temporariamente para tipagem, mas não usado diretamente nas views novas)
const INITIAL_DATA: AppState = {
  profile: {
    username: "@usuario",
    role: "Designer de UI Moderno & Desenvolvedor Frontend.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7HCm9MpBLEUw5kWF3YDTYCU0KxTtP4RiUR82m0huKV-hURIDb8gRb-QsOAB8ruU29XagIDpVAuOMLlXRmx4JUWZOK6sWYZQdFvgl4ddRGtqsh36l1aBIbeRc8Pz9QJZoSMTd-uAFGZmCuTKls2VXDxVf-A0A36RF-Ct_tQXdgjG0IUehpj38iUOK3XDcebSn1bbN5PmMP8WLP6pcdBp56i1hgVXkuF_PBpQiQl9Cdur8tnh9OP95nJIS7iPxQJsF3kENWorORgfE"
  },
  links: [
    { id: '1', title: "Meu Novo Post no Blog", url: "https://example.com/blog", visible: true },
    { id: '2', title: "Minha Loja", url: "https://example.com/shop", visible: true },
    { id: '3', title: "Ouça no Spotify", url: "https://spotify.com", visible: true },
    { id: '4', title: "Agende uma Consultoria", url: "https://calendly.com", visible: true },
  ],
  socials: [
    { id: 's1', type: 'users', url: '#' },
    { id: 's2', type: 'instagram', url: '#' },
    { id: 's3', type: 'twitter', url: '#' },
    { id: 's4', type: 'linkedin', url: '#' },
    { id: 's5', type: 'email', url: '#' },
  ]
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-full items-center justify-center text-white">Carregando...</div>;
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/update-password" element={<UpdatePasswordView />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminView
                  data={appData}
                  onSave={handleSave}
                  onLogout={() => { }}
                />
              </ProtectedRoute>
            }
          />
        </Routes >
      </div >
    </div >
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