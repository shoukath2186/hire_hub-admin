import React from 'react';
import JobCategories from '../components/Candidates/JobCategories';

const JobCategoriesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Job Categories</h1>
      <JobCategories />
    </div>
  );
};

export default JobCategoriesPage;