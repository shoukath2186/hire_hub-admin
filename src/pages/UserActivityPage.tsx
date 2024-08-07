import React from 'react';
import UserActivity from '../components/Candidates/UserActivity';

const UserActivityPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-indigo-800">User Activity</h1>
      <UserActivity />
    </div>
  );
};

export default UserActivityPage;