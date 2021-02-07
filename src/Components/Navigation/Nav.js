import React, { useState } from 'react';
import { Select } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/2160 4K.gif';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Modal from '../Modal/Modal';
import { fetchLanguage } from '../../Actions/LanguageAction';
import { connect } from 'react-redux';

const { Option } = Select;

const Nav = ({ fetchLanguage, english: { english } }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const handleChange = (e) => {
    console.log(e);
    if (e === 'english') {
      fetchLanguage(true);
      localStorage.setItem('language',JSON.stringify(true))
    }
    if (e === 'hindi') {
      fetchLanguage(false);
      localStorage.setItem('language',JSON.stringify(false))

    }
  };
  const onClick = () => {
    setIsModalVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={onClick} danger>
        Login/Register
      </Menu.Item>
    </Menu>
  );

  function openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  return (
    <div className='header'>
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <div className='header-top'>
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
      </div>
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
              <Link to='/news'>{english?'NEWS':'समाचार'}</Link>
            </li>
            <li
              className={location.pathname === '/polls' ? 'active-link' : null}
            >
              <Link to='/polls'>{english?'POLLS':'मतदान'}</Link>
            </li>
            <li
              className={location.pathname === '/awards' ? 'active-link' : null}
            >
              <Link to='/awards'>{english?'AWARDS':'अवार्डस'}</Link>
            </li>
            <li
              className={location.pathname === '/livetv' ? 'active-link' : null}
            >
              <Link to='/livetv'>{english?'LIVE TV':'लाइव टीवी'}</Link>
            </li>
            <li
              className={location.pathname === '/quiz' ? 'active-link' : null}
            >
              <Link to='/quiz'>{english?'QUIZ':'क्विज़'}</Link>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  english: state.english,
});

export default connect(mapStateToProps, {
  fetchLanguage,
})(Nav);
