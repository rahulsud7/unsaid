import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { LoadingScreen } from './components/LoadingScreen';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const UnsaidModePage = React.lazy(() => import('./pages/UnsaidModePage').then(m => ({ default: m.UnsaidModePage })));
const ClosureModePage = React.lazy(() => import('./pages/ClosureModePage').then(m => ({ default: m.ClosureModePage })));
const TherapyModePage = React.lazy(() => import('./pages/TherapyModePage').then(m => ({ default: m.TherapyModePage })));
const MemoryQuestionsPage = React.lazy(() => import('./pages/MemoryQuestionsPage').then(m => ({ default: m.MemoryQuestionsPage })));
const SessionHistoryPage = React.lazy(() => import('./pages/SessionHistoryPage').then(m => ({ default: m.SessionHistoryPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const FAQPage = React.lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const PaymentsPage = React.lazy(() => import('./pages/PaymentsPage').then(m => ({ default: m.PaymentsPage })));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const UpgradePage = React.lazy(() => import('./pages/UpgradePage').then(m => ({ default: m.UpgradePage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="unsaid-mode" element={<UnsaidModePage />} />
                <Route path="closure-mode" element={<ClosureModePage />} />
                <Route path="therapy-mode" element={<TherapyModePage />} />
                <Route path="memory-questions" element={<MemoryQuestionsPage />} />
                <Route path="session-history" element={<SessionHistoryPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="upgrade" element={<UpgradePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;