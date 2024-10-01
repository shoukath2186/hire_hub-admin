import axios from 'axios';
import  { useContext, useState,useEffect }  from 'react';
import { ProductCom } from '../../context/AppContext';
import CustomModal from "../Dashboard/Modal";

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {

  const [admin, setAdmin] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  
  const context = useContext(ProductCom);
  const admindata = context?.adminData;

  useEffect(() => {
    if (admindata) {
      setAdmin(admindata);
    }
  }, [admindata,admin]);
   
     

  const navigate = useNavigate();

  async function logout() {
    setModalHeading('Logout Confirmation')
    setModalMessage('You have been logged out successfully.')
    handleOpen()

   

  }

  const handleOpen  = () => {
   
    setOpen(true);
  };
  const handleClose =async () => {

    
    setOpen(false);
  };


  const handleModal = async () => {
   
    setOpen(false);
    try {
      
      const responce = await axios.post('https://newyourchoice.shop/admin/logout', { data: 'admin' },({ withCredentials: true}));
      if (responce.data == 'success') {
       
          context?.cleareAdminData()
          setAdmin(null)
          navigate('/login')
          toast.success('Logout successful')
       
      }
    } catch (error) {
        console.log(600,error);
        
    }
    
  };


  return (
    <header className="bg-white shadow-md z-10">
      <CustomModal
        open={open}
        handleClose={handleClose}
        handleModal={handleModal}
        title={modalHeading}
        message={modalMessage}
      />
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden mr-3"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="text-blue-600 font-bold text-3xl">Hire<span className="text-yellow-600">Hub</span></h1>
          </div>

          
              {admin ? (
                <div className="flex items-center">
                <span className="text-gray-700 text-sm mr-4">{admin.admin}</span>
    
                <button className="text-gray-500 focus:outline-none hover:text-gray-700" onClick={logout}>
                 
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 17L21 12L16 7M21 12H9M13 16V19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0391 20.7893 11.5304 21 11 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11C11.5304 3 12.0391 3.21071 12.4142 3.58579C12.7893 3.96086 13 4.46957 13 5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </button>
                  </div>
              ) : (
                <div className="flex items-center">
                <span className="text-gray-700 text-sm mr-4">Admin Pannel</span>
                  </div>

              )}


            
        </div>
      </div>
    </header>
  );
};

export default Header;