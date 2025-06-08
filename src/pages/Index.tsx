
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../components/auth/AuthPage';
import Layout from '../components/Layout';
import ProjectDashboard from '../components/projects/ProjectDashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Layout>
      <ProjectDashboard />
    </Layout>
  );
};

export default Index;
