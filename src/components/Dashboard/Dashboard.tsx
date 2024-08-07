import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Total Jobs</h2>
        <p className="text-3xl font-bold">250</p>
      </div>
      <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Active Candidates</h2>
        <p className="text-3xl font-bold">1,234</p>
      </div>
      <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Registered Employers</h2>
        <p className="text-3xl font-bold">89</p>
      </div>
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Placements This Month</h2>
        <p className="text-3xl font-bold">45</p>
      </div>
    </div>
  );
};

export default Dashboard;