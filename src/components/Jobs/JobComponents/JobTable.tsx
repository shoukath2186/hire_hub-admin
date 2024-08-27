import { useContext, useState } from "react";
import CustomModal from "../../Dashboard/Modal";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ProductCom } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

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

interface JobTableProps {
  jobs: getJob[];
  search: string;
  selectedCategory: string;
  chenge: boolean,
  setChenge: (value: boolean) => void;
}

function JobTable({ jobs, search, selectedCategory, chenge, setChenge }: JobTableProps) {

  const [id, setId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const context = useContext(ProductCom);  
  const navigate = useNavigate();


  const filteredJobs = jobs.filter(job => {
    const searchTerms = search.toLowerCase().split(' ').filter(term => term);
    const isMatch = searchTerms.every(term =>
      job.title.toLowerCase().includes(term) ||
      job.name.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
    const isCategoryMatch = selectedCategory === '' || job.category.includes(selectedCategory);
    return isMatch && isCategoryMatch;
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleModal = async () => {
    try {
      const response = await axios.patch('http://localhost:3000/admin/blockJob',{id:id}, { withCredentials: true });
       toast.success(response.data)
       handleClose()
       setChenge(!chenge)
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
   
  }

  function handileBlocking(id: string, status: boolean) {
    setId(id);
    console.log(status);
    handleOpen();
    if (status) {
      setModalHeading('Unblock Job');
      setModalMessage(`Are you sure you want to unblock this job? This will make it visible and available for applications.`);
    } else {
      setModalHeading('Block Job');
      setModalMessage(`Are you sure you want to block this job? This will hide it from being visible and prevent new applications.`);

    }
  }


  return (
    <table className="min-w-full divide-y divide-gray-200">
      <CustomModal
        open={open}
        handleClose={handleClose}
        handleModal={handleModal}
        title={modalHeading}
        message={modalMessage}
      />
      <thead className="bg-yellow-600">
        <tr>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Logo</th>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Company</th>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Location</th>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Title</th>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Applications</th>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Category</th>
          <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredJobs.map((job) => (
          <tr key={job._id}>
            <td className="px-4 text-center sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700">
              <img src={job.logo[0]} alt={`${job.name} logo`} className="w-8 h-8 mx-auto" />
            </td>
            <td className="px-4 text-center sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{job.name}</td>
            <td className="px-4 text-center sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{job.location}</td>
            <td className="px-4 text-center sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{job.title}</td>
            <td className="px-4 text-center sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{job.applications.length}</td>
            <td className="px-4 text-center sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700">{job.category.join(', ')}</td>
            <td onClick={() => handileBlocking(job._id, job.is_blocked)} className="px-6 py-3 whitespace-nowrap flex justify-center items-center">
              {job.is_blocked ? (
                <button className="flex items-center border border-green-500 text-green-500 px-1 py-1 rounded m-0 hover:bg-green-500 hover:text-white transition-colors duration-200">
                  <i className="fas fa-unlock mr-2"></i>
                  Unblock
                </button>
              ) : (
                <button className="flex items-center border border-red-500 text-red-500 px-1 py-1 rounded m-0 hover:bg-red-500 hover:text-white transition-colors duration-200">
                  <i className="fas fa-lock mr-2"></i>
                  Block
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobTable;