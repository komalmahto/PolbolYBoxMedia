import React from 'react';
import Navbar from '../Navigation/Nav';
import MainView from '../MainView/MainView';
import {useLocation,useHistory} from 'react-router-dom'

const Layout = ({match}) => {
  const location=useLocation()
  const history=useHistory()
  console.log(history)
  const pat=location.pathname.split('/')

  return (
    <div>
      {pat[1]!=="yt"&& <Navbar />}

      
      <MainView />
    </div>
  );
};

export default Layout;
