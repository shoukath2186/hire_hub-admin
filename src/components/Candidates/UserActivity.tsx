import React from 'react';

const UserActivity: React.FC = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Applied for Software Engineer position', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '4 hours ago' },
    { id: 3, user: 'Bob Johnson', action: 'Viewed Job Listing', time: '1 day ago' },
    { id: 4, user: 'Alice Brown', action: 'Submitted Resume', time: '2 days ago' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-indigo-600 text-white">
        <h2 className="text-xl font-semibold">Recent User Activity</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="px-6 py-4 hover:bg-gray-50">
            <p className="text-sm font-medium text-indigo-600">{activity.user}</p>
            <p className="text-sm text-gray-700">{activity.action}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivity;