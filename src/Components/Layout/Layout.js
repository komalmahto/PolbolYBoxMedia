import React from 'react';
import Navbar from '../Navigation/Nav';
import MainView from '../MainView/MainView';
import {useLocation} from 'react-router-dom'

const Layout = () => {
  const location=useLocation()
  return (
    <div>
      {location.pathname!=="/yt/undefined"&& <Navbar />}

      
      <MainView />
    </div>
  );
};

export default Layout;
