import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AdminData {
  admin: string;
  email: string; 
}

interface ProductContextProps {
  adminData: AdminData | null;
  setAdminAndData: (admin: string, email: string) => void;
  cleareAdminData:()=>void;
}

interface ProviderComponentProps {
  children: ReactNode;
}

export const ProductCom = createContext<ProductContextProps | undefined>(undefined);

const ProviderComponent: React.FC<ProviderComponentProps> = ({ children }) => {
    
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  useEffect(() => {
    const storedAdminData = localStorage.getItem('adminInfo');
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  const setAdminAndData = (admin: string, email: string) => {
    const newAdminData = { admin, email };
    setAdminData(newAdminData);
    localStorage.setItem('adminInfo', JSON.stringify(newAdminData));
  };

  const cleareAdminData = () => {
    setAdminData(null)
    localStorage.removeItem('adminInfo');

  };

  return (
    <ProductCom.Provider value={{ adminData, setAdminAndData,cleareAdminData }}>
      {children}
    </ProductCom.Provider>
  );
};

export default ProviderComponent;
