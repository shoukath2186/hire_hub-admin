import React, { useContext, useState } from 'react';
import { ICategory } from '../../responseType/ICategory';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ProductCom } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../Dashboard/Modal';

interface CategoryItemProps {
  category: ICategory;
  toggleBlock: (categoryId: string, status: boolean) => void;
  editCategory: (id: string, name: string) => void;
  setChinge: (value: boolean) => void
  chinge: boolean
}


const CategoryItem: React.FC<CategoryItemProps> = ({ category, toggleBlock, editCategory,setChinge,chinge }) => {

  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [id,setId]=useState<string>('')

  const context = useContext(ProductCom);
  const navigate = useNavigate();

  const handleModal = async () => {

    try {
      await axios.delete(`http://localhost:3000/admin/deleteCategory?id=${id}`, { withCredentials: true });
      setChinge(!chinge);
      toast.success('detet successfully!');
      setOpen(false)
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

   const removeCategory=async(id:string)=>{
    setId(id)
    setOpen(true)

    
   setModalHeading('Delete Category Confirmation')
   setModalMessage('Are you sure you want to delete this category? This action cannot be undone.')
     
}



  return (
    <div  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
         <CustomModal
        open={open}
        handleClose={() => setOpen(false)}
        handleModal={handleModal}
        title={modalHeading}
        message={modalMessage}

      />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${category.is_block ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {category.is_block ? 'Blocked' : 'Active'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">Total Jobs: {category.total}</p>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleBlock(category._id,category.is_block)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${category.is_block ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                >
                  {category.is_block ? 'Unblock' : 'Block'}
                </button>
                <div>

                  <button onClick={() => editCategory(category._id,category.name)} className="text-indigo-600 hover:text-indigo-800 mr-3">Edit</button>
                  {category.total==0?( <button 
                    onClick={() => removeCategory(category._id)} 
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>):null}
                 
                </div>
              </div>
            </div>
          </div>
  );
};

export default CategoryItem;
