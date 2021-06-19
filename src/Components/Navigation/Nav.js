import React, { useState } from 'react';
import { Select, Switch } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import logo from '../../assets/2160 4K.gif';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Modal from '../Modal/ModalLogin';
import { fetchLanguage } from '../../Actions/LanguageAction';
import { connect } from 'react-redux';
import Icon from '@ant-design/icons';
import { logout } from '../../Actions/AuthActions'
import onClickOutside from "react-onclickoutside";

const { Option } = Select;

const Nav = function ({ fetchLanguage, logout, english: { english }, auth: { token, user } }){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const handleChange = (checked) => {
    if (checked) {
      fetchLanguage(true);
      localStorage.setItem('language', JSON.stringify(true));
    }
    if (!checked) {
      fetchLanguage(false);
      localStorage.setItem('language', JSON.stringify(false));
    }
  };

  const handleChangeDropDown = (value) => {
    if (value === 'english') {
      fetchLanguage(true);
      localStorage.setItem('language', JSON.stringify(true));
    }
    if (value === 'hindi') {
      fetchLanguage(false);
      localStorage.setItem('language', JSON.stringify(false));
    }
  };

  const onClick = () => {
    setIsModalVisible(true);
  };

  const menu = (
    <Menu>
      {!token ? <Menu.Item onClick={onClick} danger>
        Login/Register
      </Menu.Item> : <Menu.Item onClick={logout} danger>
        Logout
      </Menu.Item>}
    </Menu>
  );

  function openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  Nav.handleClickOutside = () => closeNav();

  return (
    <div className='header'>
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      {/*<div className='header-top'>
        <Select
          bordered={false}
          className='language'
          style={{ width: 100 }}
          defaultValue={english?'english':'hindi'}
          onChange={handleChange}
        >
          <Option
            className='language-option'
            style={{ height: '22px' }}
            value='english'
          >
            {english?'English':'अंग्रेज़ी'}
          </Option>
          <Option className='language-option' value='hindi'>
          {english?'Hindi':'हिंदी '}

          </Option>
        </Select>
        <Dropdown className='guest' overlay={menu}>
          <a
            className='ant-dropdown-link guest-item'
            onClick={(e) => e.preventDefault()}
          >
            <span>
              <UserOutlined /> Guest
            </span>{' '}
            <DownOutlined />
          </a>
        </Dropdown>
      </div>*/}
      <nav className='header-nav'>
        <div className='nav-left'>
          <ul>
            <li className='logo' style={{ overflow: 'hidden' }}>
              <img
                style={{ height: '12rem', marginLeft: '10px' }}
                src={logo}
                alt='logo'
              />
            </li>
            <li className={location.pathname === '/' ? 'active-link' : null}>
              <Link to='/'>HOME</Link>
            </li>
            <li
              className={location.pathname === '/news' ? 'active-link' : null}
            >
              <Link to='/news'>{english ? 'NEWS' : 'समाचार'}</Link>
            </li>
            <li
              className={location.pathname === '/polls' ? 'active-link' : null}
            >
              <Link to='/polls'>{english ? 'POLLS' : 'मतदान'}</Link>
            </li>
            <li
              className={location.pathname === '/awards' ? 'active-link' : null}
            >
              <Link to='/awards'>{english ? 'AWARDS' : 'अवार्डस'}</Link>
            </li>
            <li
              className={location.pathname === '/livetv' ? 'active-link' : null}
            >
              <Link to='/livetv'>{english ? 'LIVE TV' : 'लाइव टीवी'}</Link>
            </li>
            <li
              className={location.pathname === '/quiz' ? 'active-link' : null}
            >
              <Link to='/quiz'>{english ? 'QUIZ' : 'क्विज़'}</Link>
            </li>
            <li style={{ position: 'absolute', right: '175px' }}>
              <Dropdown className='guest' overlay={menu}>
                <a
                  className='ant-dropdown-link guest-item'
                  onClick={(e) => { e.preventDefault() }}
                  style={{ color: 'white' }}
                >
                  <span style={{ color: 'white' }}>
                    <i style={{ color: 'white' }} className="far fa-user"></i> {!token ? "Guest" : user && user.userName && user.userName}
                  </span>{' '}
                  <span>
                    {' '}
                    <i style={{ color: 'white' }} className="fas fa-chevron-down"></i>                  </span>
                </a>
              </Dropdown>
            </li>
            <li style={{ position: 'absolute', right: '0px' }}>
              <span>हिंदी</span><Switch style={{ margin: '0 1rem' }} defaultChecked={english ? true : false} onChange={handleChange} /><span>English</span>
              {/* <Select
                bordered={false}
                className='language'
                style={{ width: 100, color: 'white' }}
                defaultValue={english ? 'english' : 'hindi'}
                onChange={handleChange}
                theme='dark'
                className="ant-select-selection"

              >
                <Option
                  className='language-option'
                  style={{ height: '22px' }}
                  value='english'
                >
                  <span> {english ? 'English' : 'अंग्रेज़ी'}</span>
                </Option>
                <Option className='language-option' value='hindi'>
                  <span>{english ? 'Hindi' : 'हिंदी '}</span>
                </Option>
              </Select> */}
            </li>
          </ul>
        </div>




        <div className='nav-right'>
          <span
            className='side'
            style={{
              fontSize: '30px',
              cursor: 'pointer',
              color: 'white',
              marginRight: '3rem',
            }}
            onClick={openNav}
          >
            &#9776;
          </span>
        </div>
      </nav>
      <div id='mySidenav' className='sidenav'>
        <a href='javascript:void(0)' className='closebtn' onClick={closeNav}>
          &times;
        </a>
        <li>
          <span style={{ color: 'white' }}>
           {!token ? <span style={{marginLeft:'35px'}} onClick={()=>{onClick();closeNav()}}>Login/Register</span>: <i style={{ color: 'white' , marginLeft:'35px' }} className="far fa-user"></i>}  {!token ? null : user && user.userName && user.userName}
          </span>
        </li>
       
        {/* <li>
          <Dropdown className='guest' overlay={menu} trigger={['click']}>
            <a
              className='ant-dropdown-link guest-item'
              onClick={(e) => e.preventDefault()}
              style={{ color: 'white', fontSize: '1.5rem' }}
            >
              <span style={{ color: 'white' }}>
                <i style={{ color: 'white' }} className="far fa-user"></i> {!token ? "Guest" : user && user.userName && user.userName}
              </span>{' '}
              <span>
                {' '}
                <i style={{ color: 'white' }} className="fas fa-chevron-down"></i>                  </span>
            </a>
          </Dropdown>
        </li> */}
        <li style={{ marginLeft: '35px' }}>
          {/* <Select
            bordered={false}
            className='language'
            defaultValue={english ? 'english' : 'hindi'}
            onChange={handleChangeDropDown}
            theme='dark'
            className="ant-select-selection"

          >
            <Option
              className='language-option'
              style={{ height: '22px', color: 'black' }}
              value='english'
            >
              <span> {english ? 'English' : 'अंग्रेज़ी'}</span>
            </Option>
            <Option className='language-option' value='hindi'>
              <span>{english ? 'Hindi' : 'हिंदी '}</span>
            </Option>
          </Select> */}
          <span style={{color:'white'}}>हिंदी</span><Switch style={{ margin: '0 1rem' }} defaultChecked={english ? true : false} onChange={handleChange} /><span  style={{color:'white'}}>English</span>
        </li>
        <li
          onClick={closeNav}
          className={location.pathname === '/' ? 'active-link' : null}
        >
          <Link to='/'>HOME</Link>
        </li>
        <li
          onClick={closeNav}
          className={location.pathname === '/news' ? 'active-link' : null}
        >
          <Link to='/news'>NEWS</Link>
        </li>
        <li
          onClick={closeNav}
          className={location.pathname === '/polls' ? 'active-link' : null}
        >
          <Link to='/polls'>POLLS</Link>
        </li>
        <li
          onClick={closeNav}
          className={location.pathname === '/awards' ? 'active-link' : null}
        >
          <Link to='/awards'>AWARDS</Link>
        </li>
        <li
          onClick={closeNav}
          className={location.pathname === '/livetv' ? 'active-link' : null}
        >
          <Link to='/livetv'>LIVE TV</Link>
        </li>
        <li
          onClick={closeNav}
          className={location.pathname === '/quiz' ? 'active-link' : null}
        >
          <Link to='/quiz'>QUIZ</Link>
        </li>

        {token ? <li><span style={{ color: 'white',marginLeft:'35px' }} onClick={logout}> Logout</span> </li> : null}

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  english: state.english,
  auth: state.auth
});

const clickOutsideConfig = {
  handleClickOutside: () => Nav.handleClickOutside
};


export default connect(mapStateToProps, {
  fetchLanguage, logout
})(onClickOutside(Nav, clickOutsideConfig));
