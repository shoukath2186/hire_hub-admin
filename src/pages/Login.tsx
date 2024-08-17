import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductCom } from '../context/AppContext';

type Inputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [showPassword, setShowPassword] = React.useState(false);
  const context = React.useContext(ProductCom);
  

  const navigate=useNavigate()
  
  const onSubmit: SubmitHandler<Inputs> =async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/admin/login', data, {withCredentials: true});

      console.log(response);
      
    
      if(response.status==200){


        toast.success('LogIn successful.');
         const adminData = response.data;

         const admin:string=adminData.name;
         const email:string=adminData.email;
         
           context?.setAdminAndData(admin,email)
        
       
         navigate('/')
      };
      
      
       
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Response Data:', error.response?.data);
         toast.error(error.response?.data)
      } else {
        console.error('Error:', error);
      }
      
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-5">
             Sign in
          </h2>
        
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
           
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Invalid email address"
                    } 
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
              <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    },
                    validate: {
                      noSpaces: value => !/\s/.test(value) || "Password cannot contain spaces"
                    }
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Add other items here if needed */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
