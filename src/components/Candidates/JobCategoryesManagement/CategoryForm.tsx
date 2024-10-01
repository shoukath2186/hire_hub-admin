import axios, { AxiosError } from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductCom } from '../../../context/AppContext';
import { ICategory } from '../../responseType/ICategory'; 

interface CategoryFormProps {
  edit: boolean;
  newCategory: string;
  setNewCategory: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  addCategory: () => void;
  setEdit: (value: boolean) => void
  id: string
  setChinge: (value: boolean) => void
  chinge: boolean
  categories:ICategory[]
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  edit,
  newCategory,
  setNewCategory,
  searchTerm,
  setSearchTerm,
  addCategory,
  setEdit,
  id,
  setChinge,
  chinge,
  categories
}) => {

  function cansel() {
    setNewCategory('')
    setEdit(false)
  }

  const navigate = useNavigate();
  const context = useContext(ProductCom);

  async function submitEdite() {

    const trimmedCategory = newCategory.trim();
    const hasThreeAlphabeticChars = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(trimmedCategory);

    if (hasThreeAlphabeticChars) {

      if (categories?.some((category) => category.name.toLowerCase() === trimmedCategory.toLowerCase())) {
        toast.error('Category value cannot be changed or already exists.');
        return;
      }
    

    try {
      await axios.patch('https://newyourchoice.shop/admin/editCategory', { id, newCategory }, { withCredentials: true });
      setChinge(!chinge);
      setNewCategory('')
      setEdit(false)
      toast.success('Changes saved successfully!');
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
  }else{
    toast.error('Category must include at least 3 alphabetic characters and not already exist.');
  }

  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="w-full sm:w-64 px-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {edit ? (<><button
          onClick={submitEdite}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Confirm
        </button>
          <button
            onClick={cansel}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cansel
          </button></>) : (<button
            onClick={addCategory}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Category
          </button>)}

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
    </div>
  );
};

export default CategoryForm;
