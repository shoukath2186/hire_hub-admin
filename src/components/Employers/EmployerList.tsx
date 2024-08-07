import React from 'react';

const EmployerList: React.FC = () => {
  const employers = [
    { id: 1, name: 'Tech Co', industry: 'Technology', location: 'San Francisco, CA' },
    { id: 2, name: 'Startup Inc', industry: 'Software', location: 'New York, NY' },
    { id: 3, name: 'Big Data Corp', industry: 'Data Analytics', location: 'Seattle, WA' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employers.map((employer) => (
            <tr key={employer.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employer.industry}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerList;