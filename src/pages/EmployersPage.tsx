import React from 'react';
import EmployerList from '../components/Employers/EmployerList';

const EmployersPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Employers</h1>
      <EmployerList />
    </div>
  );
};

export default EmployersPage;