
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../components/auth/AuthPage';
import Layout from '../components/Layout';
import ProjectDashboard from '../components/projects/ProjectDashboard';
import Landing from './Landing';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (!isAuthenticated) {
    if (showAuth) {
      return <AuthPage />;
    }
    return <Landing onNavigateToAuth={() => setShowAuth(true)} />;
  }

  return (
    <Layout>
      <ProjectDashboard />
    </Layout>
  );
};

export default Index;
