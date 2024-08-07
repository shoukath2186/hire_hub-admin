import React from 'react';
import JobList from '../components/Jobs/JobList';

const JobsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Jobs</h1>
      <JobList />
    </div>
  );
};

export default JobsPage;