import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/Login';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import CandidatesPage from './pages/CandidatesPage';
import EmployersPage from './pages/EmployersPage';
import JobCategoriesPage from './pages/JobCategoriesPage';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route 
            path="/login" 
            element={
              <RedirectIfAuthenticated>
                <LoginPage />
              </RedirectIfAuthenticated>
            } 
          />
          <Route path="/" element={<ProtectedRoute element={<DashboardPage />} />} />
          <Route path="/jobs" element={<ProtectedRoute element={<JobsPage />} />} />
          <Route path="/candidates" element={<ProtectedRoute element={<CandidatesPage />} />} />
          <Route path="/employers" element={<ProtectedRoute element={<EmployersPage />} />} />
          <Route path="/categories" element={<ProtectedRoute element={<JobCategoriesPage />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
