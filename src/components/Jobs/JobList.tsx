import React, { useContext, useEffect, useState } from 'react';
import JobTable from './JobComponents/JobTable';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductCom } from '../../context/AppContext';

interface getJob {
  _id: string;
  logo: string[];
  name: string;
  location: string;
  title: string;
  applications: string[];
  category: string[];
  is_blocked: boolean;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<getJob[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [chenge,setChenge]=useState<boolean>(false)
  const context = useContext(ProductCom);
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const response = await axios.get('https://newyourchoice.shop/admin/allJobs', { withCredentials: true });
      const allJobs: getJob[] = response.data;
      //console.log(4567,response.data);
      setJobs(allJobs);
      setCategories(Array.from(new Set(allJobs.flatMap(job => job.category))));
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        let data: any = err?.response?.data;
        toast.error(data);
        if (['No refresh token', 'Refresh token has expired', 'Invalid refresh token', 'No token'].includes(data)) {
          context?.cleareAdminData();
          navigate('/login');
        }
      }
    }
  };

  useEffect(() => {
    getAllData();
  }, [chenge]);

  return (
    <div className="bg-blue-50 shadow-sm rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6 bg-gray-300">
        <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs"
            className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
        <JobTable jobs={jobs} search={search} selectedCategory={selectedCategory} chenge={chenge} setChenge={setChenge}/>
        </div>
      </div>
    </div>
  );
};

export default JobList;