import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InterviewSession from './pages/InterviewSession';
import FeedbackReport from './pages/FeedbackReport';
import { Loader2 } from 'lucide-react';

import Landing from './pages/Landing';
import MockConfigure from './pages/MockConfigure';
import Analyzer from './pages/Analyzer';
import LearningDashboard from './pages/LearningDashboard';
import QuestionBank from './pages/QuestionBank';
import CompanyPrep from './pages/CompanyPrep';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Main Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:id"
            element={
              <ProtectedRoute>
                <InterviewSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback/:id"
            element={
              <ProtectedRoute>
                <FeedbackReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mock-configure"
            element={
              <ProtectedRoute>
                <MockConfigure />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyzer"
            element={
              <ProtectedRoute>
                <Analyzer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning"
            element={
              <ProtectedRoute>
                <LearningDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question-bank"
            element={
              <ProtectedRoute>
                <QuestionBank />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company-prep"
            element={
              <ProtectedRoute>
                <CompanyPrep />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Landing & Root Routes */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
