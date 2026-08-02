import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 py-8 md:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
