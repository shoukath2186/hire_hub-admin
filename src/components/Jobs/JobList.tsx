import React, { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
}

const JobList: React.FC = () => {
  const initialJobs: Job[] = [
    { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'San Francisco, CA', category: 'Software Development' },
    { id: 2, title: 'Product Manager', company: 'Startup Inc', location: 'New York, NY', category: 'Management' },
    { id: 3, title: 'Data Scientist', company: 'Big Data Corp', location: 'Seattle, WA', category: 'Data Science' },
    { id: 4, title: 'UX Designer', company: 'Design Studio', location: 'Los Angeles, CA', category: 'Design' },
  ];

  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(initialJobs.map(job => job.category)));

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === '' || job.category === selectedCategory)
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Job Listings</h2>
      </div>
      <div className="p-6">
        <div className="flex mb-4 space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;