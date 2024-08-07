import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../responseType/Users";
import CustomModal from "../Dashboard/Modal";



const CandidateList: React.FC = () => {
  const [usersData, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const [Blockdata,setBlockdata]=useState('')





  useEffect(() => {

    async function findData() {
      try {
        const response = await axios.get('http://localhost:3000/admin/getUserData');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    findData();
  }, []);

  
  const handleOpen  = () => {
   
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleModal = async () => {
   // console.log(Blockdata);
    
    try {
        const data=({userId:Blockdata})
        const response = await axios.post('http://localhost:3000/admin/UserBlocking',data);
          
          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } else if (response.data && Array.isArray(response.data.data)) {
            setUsers(response.data.data);
          } else {
            console.error('Unexpected data format:', response.data);
            setUsers([]);
          }
        
        
       } catch (error) {
        console.log(error);
        
       }
   
    setOpen(false);
    setBlockdata('')
    
  };

  async function handileBlock(userId:string,status:boolean,userName:string){
    setBlockdata(userId)

    console.log(userId);
    
     
    if(status){
      setModalHeading('User Block Confirmation');
      setModalMessage(`Are you sure you want to block the user Name ${userName}?`);
    }else{
      setModalHeading('User Unblock Confirmation');
      setModalMessage(`Are you sure you want to unblock the user Name ${userName}?`);
    }
     
    
     

     handleOpen()
  
  }


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };



  const filteredUsers = usersData.filter((user) =>
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toString().includes(searchTerm)


  );

  return (
    <div className="container mx-auto p-4">
     <CustomModal
        open={open}
        handleClose={handleClose}
        handleModal={handleModal}
        title={modalHeading}
        message={modalMessage}
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Candidate List</h1>
        <input
          type="text"
          className="border p-2 rounded shadow-sm"
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((candidate) => (
              <tr key={candidate._id}>
                <td className="px-6 py-3 whitespace-nowrap text-center justify-center items-center">{candidate.profilePicture=="hello"?(
                   <img
                   src='https://www.pngall.com/wp-content/uploads/5/User-Profile-Transparent.png'
                   alt="User"
                   className="w-8 h-8 rounded-full m-0"
                 />
                ):(
                  
                  <img
                    src={candidate.profilePicture}
                    alt="User"
                    className="w-8 h-8 rounded-full m-0"
                  />
                )}
                  
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-center">{candidate.user_name + ' ' + candidate.last_name}</td>
                <td className="px-6 py-3 whitespace-nowrap text-center">{candidate.email}</td>
                <td className="px-6 py-3 whitespace-nowrap text-center">{candidate.phone == 0 ? 'No Number' : candidate.phone}</td>
                <td className="px-6 py-3 whitespace-nowrap text-center">{candidate.user_role}</td>
                <td onClick={()=>handileBlock(candidate._id,candidate.isBlocked,candidate.user_name)} className="px-6 py-3 whitespace-nowrap flex justify-center items-center">
                  {candidate.isBlocked ? (
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
      </div>
    </div>
  );
};

export default CandidateList;
