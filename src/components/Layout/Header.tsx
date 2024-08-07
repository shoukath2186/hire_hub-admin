import axios from 'axios';
import React from 'react';

import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {

  const [admin, setAdmin] = React.useState<any>(null);
  const navigate = useNavigate();


  React.useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    // console.log(adminInfo);

    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
  }, []);

  async function logout() {
    try {
      const responce = await axios.post('http://localhost:3000/admin/logout', { data: 'admin' });

      if (responce.data == 'success') {
        console.log(responce);
        
         navigate('/login')
        localStorage.clear()
      }



    } catch (error) {
        console.log(600,error);
        
    }





  }
  return (
    <header className="bg-white shadow-md z-10">
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

          <div className="flex items-center">
            <span className="text-gray-700 text-sm mr-4">Admin User</span>

            <button className="text-gray-500 focus:outline-none hover:text-gray-700" onClick={logout}>
              {admin ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 17L21 12L16 7M21 12H9M13 16V19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0391 20.7893 11.5304 21 11 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11C11.5304 3 12.0391 3.21071 12.4142 3.58579C12.7893 3.96086 13 4.46957 13 5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7L3 12L8 17M3 12H15M11 8V5C11 4.46957 11.2107 3.96086 11.5858 3.58579C11.9609 3.21071 12.4696 3 13 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H13C12.4696 21 11.9609 20.7893 11.5858 20.4142C11.2107 20.0391 11 19.5304 11 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              )}


            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;