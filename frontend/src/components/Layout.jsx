import React from 'react';
import { NavBar } from './NavBar';

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className='container mx-auto'>
        <NavBar />
        {children}
      </div>
    </React.Fragment>
  )
}
