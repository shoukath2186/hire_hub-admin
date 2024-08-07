import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-2 md:mb-0">© 2023 HireHub. All rights reserved.</div>
          <div className="text-gray-600">Version 1.0.0</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;