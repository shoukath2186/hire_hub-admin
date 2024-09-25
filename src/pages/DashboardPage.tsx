import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ProductCom } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const [monthUserGraph, setMonthUserGraph] = useState<number[]>(Array(31).fill(0));
  const [monthJobGraph, setMonthJobGraph] = useState<number[]>(Array(31).fill(0));
  const [yearUserGraph, setYearUserGraph] = useState<number[]>(Array(12).fill(0));
  const [yearJobGraph, setYearJobGraph] = useState<number[]>(Array(12).fill(0));
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [totalApplications, setTotalApplications] = useState<number>(0);
  const [totalEmployers, setTotalEmployers] = useState<number>(0);
  const [totalSeekers, setTotalSeekers] = useState<number>(0);

  const navigate = useNavigate();
  const context = useContext(ProductCom);

  const fetchAdminGraph = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/graph`, { withCredentials: true });

      console.log('graph Data',data);

      setTotalJobs(data.totalJob);
      setTotalApplications(data.totalApplication);
      setTotalEmployers(data.totalEmployer);
      setTotalSeekers(data.totalSeeker);

      setMonthUserGraph(data.data.monthlyData.userData)
      setMonthJobGraph(data.data.monthlyData.jobData)


      setYearUserGraph(data.data.yearlyData.userData);
      setYearJobGraph(data.data.yearlyData.jobData);


    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        const errorData = err.response.data as string;
        toast.error(errorData);
        if (['No refresh token', 'Refresh token has expired', 'Invalid refresh token', 'No token'].includes(errorData)) {
          context?.cleareAdminData();
          navigate('/login');
        }
      }
    }
  };

  useEffect(() => {
    fetchAdminGraph();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Total Jobs</h2>
          <p className="text-3xl font-bold">{totalJobs}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Active Candidates</h2>
          <p className="text-3xl font-bold">{totalSeekers}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Registered Employers</h2>
          <p className="text-3xl font-bold">{totalEmployers}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Total Applications</h2>
          <p className="text-3xl font-bold">{totalApplications}</p>
        </div>
      </div>

      <div className="md:flex w-full mt-6">
        <div className="md:w-[50%] p-4 md:mr-3 mt-5">
          <div>
            <p className="text-center text-2xl font-semibold text-blue-600">MONTH</p>
          </div>
          <BarChart
            series={[
              {
                label: 'Users',
                data: monthUserGraph,
                color: '#4285F4'
              },
              {
                label: 'Jobs',
                data: monthJobGraph,
                color: '#FBBC05'
              },
            ]}
            height={290}
            xAxis={[{
              data: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
              scaleType: 'band'
            }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>

        <div className="md:w-[50%] p-4 md:ml-3 mt-5">
          <div>
            <p className="text-center text-2xl font-semibold text-yellow-600">YEAR</p>
          </div>
          <BarChart
            series={[
              { label: 'Users', data: yearUserGraph },
              { label: 'Jobs', data: yearJobGraph },
            ]}
            height={290}
            xAxis={[{
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              scaleType: 'band'
            }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;