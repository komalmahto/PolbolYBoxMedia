import React from 'react';
import { Select } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/2160 4K.gif';
import {Link,useLocation} from 'react-router-dom'
const { Option } = Select;

const Nav = () => {
  const location=useLocation();
  const handleChange = () => {};
  const menu = (
    <Menu>
      <Menu.Item danger>Login/Register</Menu.Item>
    </Menu>
  );

  return (
    <div className='header'>
      <div className='header-top'>
        <Select
          bordered={false}
          className='language'
          defaultValue='english'
          style={{ width: 100 }}
          onChange={handleChange}
        >
          <Option
            className='language-option'
            style={{ height: '22px' }}
            value='english'
          >
            English
          </Option>
          <Option className='language-option' value='hindi'>
            Hindi
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
        <div className="nav-left">
          <ul>
            <li className="logo" style={{overflow:'hidden'}}>
              <img style={{ height: '12rem',marginLeft:'10px' }} src={logo} alt='logo' />
            </li>
            <li className={location.pathname==='/'?"active-link":null}><Link to='/'>HOME</Link></li>
            <li className={location.pathname==='/news'?"active-link":null}><Link to='/news'>NEWS</Link></li>
            <li className={location.pathname==='/polls'?"active-link":null}><Link to="/polls">POLLS</Link></li>
            <li className={location.pathname==='/awards'?"active-link":null}><Link to="/awards">AWARDS</Link></li>
            <li className={location.pathname==='/livetv'?"active-link":null}><Link to="/livetv">LIVE TV</Link></li>
            <li className={location.pathname==='/quiz'?"active-link":null}><Link to="/quiz">QUIZ</Link></li>
          </ul>
        </div>
        <div className="nav-right"></div>
      </nav>
    </div>
  );
};

export default Nav;
