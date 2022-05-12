import React, { useState } from 'react'
import { FaBars, FaBell } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import { Col, Image, Row } from 'react-bootstrap';
import user from '../images/users/user1.jpg'

const Navbar = () => {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Row className='align-items-center w-100'>
            <Col xs='4' lg='2' className='d-flex align-items-center'>
              <Link to='#' className='menu-bars'>
                <FaBars onClick={showSidebar} />
              </Link>
              <h3 className='color-white text-center ms-5'>NewsTube</h3>
            </Col>
            <Col xs='4' lg='8'>
              <h6 className='color-white py-3 px-4 border border-1 border-light radius_15 w-50 mx-auto d-flex align-items-center'>
                <BsSearch className='me-3' />
                <input type="text" className='bg-transparent border-0 w-100 color-white outline_none' placeholder='Search' />
              </h6>
            </Col>
            <Col xs='4' lg='2' className='d-flex align-items-center justify-content-end'>
              <FaBell size={20} />
              <div className='nav_profile'>
                <Image src={user} className='nav_user noselect' />
              </div>
            </Col>
          </Row>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items ps-0' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar