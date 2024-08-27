import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { ICategory } from '../responseType/ICategory';
import { ProductCom } from '../../context/AppContext';

import CustomModal from '../Dashboard/Modal';
import CategoryForm from './JobCategoryesManagement/CategoryForm';
import CategoryItem from './JobCategoryesManagement/CategoryItem';

const JobCategories: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [edit, setEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [blockData, setBlockData] = useState('');
  const [id, setId] = useState<string>('')
  const [chinge, setChinge] = useState<boolean>(true)

  const context = useContext(ProductCom);
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const categoryData = await axios.get('http://localhost:3000/admin/allCategory', { withCredentials: true });
      const category = categoryData.data;
      setCategories(category);
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
    setEdit(false)
    setNewCategory('')
    let isMounted = true;
    if (isMounted) {
      getAllData();
    }
    return () => {
      isMounted = false;
    };
  }, [chinge]);

  const addCategory = async () => {
    const trimmedCategory = newCategory.trim();
    const hasThreeAlphabeticChars = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(trimmedCategory);

    if (hasThreeAlphabeticChars) {

      if (categories?.some((category) => category.name.toLowerCase() === trimmedCategory.toLowerCase())) {
        toast.error('Category already exists.');
        return;
      }

      setNewCategory('');
      try {
        const categoryData = await axios.post('http://localhost:3000/admin/addCategory', { name: trimmedCategory }, { withCredentials: true });
        setCategories(categoryData.data);
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
    } else {
      toast.error('Category must include at least 3 alphabetic characters and not already exist.');
    }
  };

  const toggleBlock = (categoryId: string, status: boolean) => {
    setBlockData(categoryId);

    if (status) {
      setModalHeading('Category Block Confirmation');
      setModalMessage(`Are you sure you want to block?`);
    } else {
      setModalHeading('Category Unblock Confirmation');
      setModalMessage(`Are you sure you want to unblock?`);
    }

    setOpen(true);
  };

  const handleModal = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/admin/categoryBlocking?id=${blockData}`,
        {},
        { withCredentials: true }
      );
      setCategories(response.data);
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

    setOpen(false);
    setBlockData('');
  };

  function editCategory(Id: string, name: string) {




    setId(Id)
    setNewCategory(name)
    setEdit(true)
  }



  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <CustomModal
        open={open}
        handleClose={() => setOpen(false)}
        handleModal={handleModal}
        title={modalHeading}
        message={modalMessage}

      />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Job Categories</h2>

      <CategoryForm
        edit={edit}
        id={id}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        addCategory={addCategory}
        setEdit={setEdit}
        setChinge={setChinge}
        chinge={chinge}
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories
          .filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              toggleBlock={toggleBlock}
              editCategory={editCategory}
              setChinge={setChinge}
              chinge={chinge}
            />
          ))}
      </div>
    </div>
  );
};

export default JobCategories;
