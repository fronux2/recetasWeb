// src/layouts/Layout.tsx
import React from 'react';
import NavBar from '../components/NavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
