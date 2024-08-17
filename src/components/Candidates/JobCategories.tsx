import axios,{ AxiosError } from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { ICategory } from '../responseType/ICategory';
import { ProductCom } from '../../context/AppContext';

import CustomModal from "../Dashboard/Modal"; 


const JobCategories: React.FC = () => {


  const [categories, setCategories] = useState<ICategory[]>([]);

  const [newCategory, setNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredCategories, setFilteredCategories] = useState(categories);

  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [Blockdata,setBlockdata]=useState('')

  const context = useContext(ProductCom);


  const navigate=useNavigate()


  const getAllData=async ()=>{
         
    try {

      const categoryData=await axios.get('http://localhost:3000/admin/allCategory',{ withCredentials: true })
       
      const category= categoryData.data

      setCategories(category)

    } catch (error) {

      const err = error as AxiosError
      if (err?.response) {
        let data:any=err?.response?.data
        toast.error(data);
        if(data=='No refresh token'||data=='Refresh token has expired'||data=='Invalid refresh token'||data=='No token'){
           context?.cleareAdminData()
           navigate('/login')
        }
     }
      
    }
    
  }





  useEffect(() => {

    let isMounted = true;
    if (isMounted) {
        getAllData();
    }
    isMounted = false;
    return 
    
   
  }, []);



  const addCategory =async () => {
     
  const trimmedCategory = newCategory.trim();
  
  const hasThreeAlphabeticChars = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(trimmedCategory);

  if (hasThreeAlphabeticChars ) {

    if (categories?.some((category: { name: string }) => category.name.toLowerCase() === trimmedCategory.toLowerCase())) {

      toast.error('Category already exists.');

      return;
       
  }
    
    
    setNewCategory(''); 
     try {

        const categoryData=await axios.post('http://localhost:3000/admin/addCategory',{name:trimmedCategory},{ withCredentials: true })
    
         console.log(categoryData.data);
         
          setCategories(categoryData.data)
        
     } catch (error) {

      const err = error as AxiosError
      if (err?.response) {
        let data:any=err?.response?.data
        toast.error(data);
        if(data=='No refresh token'||data=='Refresh token has expired'||data=='Invalid refresh token'||data=='No token'){
           context?.cleareAdminData()
           navigate('/login')
        }
     }
      
     }
    
   
  } else {
    toast.error('Category must include at least 3 alphabetic characters and not already exist.');
  
  };

}

  const removeCategory = (categoryName: string) => {
    console.log(categoryName);
    
    // setCategories(categories.filter(c => c.name !== categoryName));
  };

  //====================================================================================

  const handleOpen  = () => {
   
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleModal = async () => {

    console.log(Blockdata);
    
    try {
        const response = await axios.patch(
          `http://localhost:3000/admin/categoryBlocking?id=${Blockdata}`,
           {},
          { withCredentials: true }
         );
          
         console.log(response.data);
         
          setCategories(response.data)
        
       } catch (error) {

        const err = error as AxiosError

        console.log(err.message);
        
        if (err?.response) {
          let data:any=err?.response?.data
          toast.error(data);
          if(data=='No refresh token'||data=='Refresh token has expired'||data=='Invalid refresh token'||data=='No token'){
             context?.cleareAdminData()
             navigate('/login')
          }
       }
      }
   
    setOpen(false);
    setBlockdata('');
    
  };

  const toggleBlock = (categoryId: string,status:boolean) => {

    setBlockdata(categoryId);

    if(status){
      setModalHeading('Category Block Confirmation');
      setModalMessage(`Are you sure you want to block?`);
    }else{
      setModalHeading('Category Unblock Confirmation');
      setModalMessage(`Are you sure you want to unblock?`);
    }
     
     handleOpen()
  };

  async function editCategory(id:string,name:string){

    console.log(id,name);
    

  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <CustomModal
        open={open}
        handleClose={handleClose}
        handleModal={handleModal}
        title={modalHeading}
        message={modalMessage}
      />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Job Categories</h2>
      
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="w-full sm:w-64 px-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          onClick={addCategory}
          className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Category
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px] px-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
        />
          <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 16a6 6 0 100-12 6 6 0 000 12zm0 0l6 6"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${category.is_block ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {category.is_block ? 'Blocked' : 'Active'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">Total Jobs: 12</p>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleBlock(category._id,category.is_block)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${category.is_block ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                >
                  {category.is_block ? 'Unblock' : 'Block'}
                </button>
                <div>

                  <button onClick={() => editCategory(category._id,category.name)} className="text-indigo-600 hover:text-indigo-800 mr-3">Edit</button>

                  <button 
                    onClick={() => removeCategory(category._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
