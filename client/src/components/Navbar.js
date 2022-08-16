import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";
import { SidebarData, creatorSidebar } from "../data/SidebarData";
import { IconContext } from "react-icons";
import { Col, Dropdown, Image, Row } from "react-bootstrap";
import UserContext from "../context/UserContext";
import axios from "../components/axios";
import user from "../images/users/user1.jpg";

import NewsContext from "../context/NewsContext";
import SearchContext from "../context/SearchContext";

import "../css/Navbar.css";


const Navbar = () => {
  // const { news } = useContext(NewsContext);
  const { getAllResults } = useContext(SearchContext);
  const { auth, resetAuth, isUserAuthenticated, isCreator } =
    useContext(UserContext);
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [mainSidebar, setMainSidebar] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSidebar = () => {
    if (isUserAuthenticated() && isCreator()) {
      setMainSidebar(creatorSidebar);
    } else {
      setMainSidebar(SidebarData);
    }
  };
  const [searchPane, setSearchPane] = useState(false)


  useEffect(() => {
    handleSidebar();
  }, [isUserAuthenticated(), isCreator()]);

  const handleSearch = async (value) => {
    setSearch(value)
  };

  useEffect(() => {

    if(search === ""){
      setSearchPane(false)
    }
    else {
      setSearchPane(true)
    }
    async function getResults() {
      if(search !== "" || search !== undefined || search !== null){
        setSearchResults(Object.entries(await getAllResults(search)));
      }
    }

    getResults()
  }, [search])

  useEffect(() => {
    // console.log(Object.keys(searchResults).length);
    // if (searchResults && Object.keys(searchResults).length > 0) {
    //   setSearchPane(true)
    // }
    // else {
    //   setSearchPane(false)
    // }
    console.log(searchResults)
  }, [searchResults])

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar display-fixed">
          <Row className="align-items-center w-100">
            <Col xs="4" lg="2" className="d-flex align-items-center">
              <Link to="#" className="menu-bars">
                <FaBars onClick={showSidebar} />
              </Link>
              <Link to="/">
                <h3 className={`color-white text-center ${sidebar ? "move-logo" : "ms-5"}`}>NewsTube</h3>
              </Link>
            </Col>
            <Col xs="4" lg="8">
              <div className="position-relative w-50 mx-auto">

                <div className="color-white py-2 px-4 border border-1 border-light radius_15 d-flex align-items-center">
                  <BsSearch className="me-3" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="bg-transparent border-0 w-100 color-white outline_none"
                    placeholder="Search"
                  />
                </div>
                {
                  searchPane &&
                  <div className='search-pane card_box_shadow'>
                    <ul className="list-unstyled m-0">
                      {
                        searchResults.map((arr, i) => {
                          // console.log(arr[0] + ": ", arr[1])
                          let type = arr[0]
                          let data;
                          let route;
                          if(type === "channels") {
                            data = arr[1].slice(0, 3) 
                            route = "/channel"
                          }
                          else if(type === "news"){
                            data = arr[1].slice(0, 8);
                            route = "/news"
                          }

                          return data?.map(result => (
                            <Link key={result?._id} to={`${route}/${result?._id}`}>
                              <li className="d-flex align-items-center justify-content-between">
                                <p className="m-0 my-2 ">
                                  <BsSearch className="me-2" color="#000" />
                                  <span className="m-0 p-0">{result.title || result.name}</span> 
                                </p>
                                <span className="m-0 p-0 font_12 secondary"> {result.description || "channel"}</span>
                              </li>
                            </Link>
                          ))
                        })
                      }
                    </ul>
                  </div>
                }
              </div>
            </Col>
            <Col
              xs="4"
              lg="2"
              className="d-flex align-items-center justify-content-end"
            >
              {/* <FaBell size={20} /> */}
              {!auth.token ? (
                <Link to="/login">
                  <p className="nav_profile d-flex justify-content-between align-items-center cursor-pointer">
                    <BiLogIn size={20} />
                    <span className="color-white ps-1">Login</span>
                  </p>
                </Link>
              ) : (
                <div className="d-flex align-items-center justify-content-between cursor-pointer">
                  
                  <Dropdown className='notifications'>
                    <Dropdown.Toggle className='bell_icon'>
                      <IoMdNotificationsOutline size={30} className='me-3' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='radius_15' style={{minWidth: '500px'}}>
                      <p className='bold font_22 px-4'>Notifications</p>
                      <Dropdown.Item href="#/action-1" className='py-2'>
                        <Row className='align-items-center'>
                          <Col xs={12} sm={8} md={1}>
                            <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="" height="30" width="30" roundedCircle/>
                          </Col>
                          <Col xs={12} sm={8} md={9}>
                            <p className='font_14'>Title goes here</p>
                            <p className='font_12 bold'>Author Name</p>
                          </Col>
                          <Col xs={12} sm={8} md={2}>
                            <small>Aug, 11</small>
                          </Col>
                        </Row>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-1" className='py-2'>
                        <Row className='align-items-center'>
                          <Col xs={12} sm={8} md={1}>
                            <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="" height="30" width="30" roundedCircle/>
                          </Col>
                          <Col xs={12} sm={8} md={9}>
                            <p className='font_14'>Title goes here</p>
                            <p className='font_12 bold'>Author Name</p>
                          </Col>
                          <Col xs={12} sm={8} md={2}>
                            <small>Aug, 11</small>
                          </Col>
                        </Row>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-1" className='py-2'>
                        <Row className='align-items-center'>
                          <Col xs={12} sm={8} md={1}>
                            <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="" height="30" width="30" roundedCircle/>
                          </Col>
                          <Col xs={12} sm={8} md={9}>
                            <p className='font_14'>Title goes here</p>
                            <p className='font_12 bold'>Author Name</p>
                          </Col>
                          <Col xs={12} sm={8} md={2}>
                            <small>Aug, 11</small>
                          </Col>
                        </Row>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-1" className='py-2'>
                        <Row className='align-items-center'>
                          <Col xs={12} sm={8} md={1}>
                            <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="" height="30" width="30" roundedCircle/>
                          </Col>
                          <Col xs={12} sm={8} md={9}>
                            <p className='font_14'>Title goes here</p>
                            <p className='font_12 bold'>Author Name</p>
                          </Col>
                          <Col xs={12} sm={8} md={2}>
                            <small>Aug, 11</small>
                          </Col>
                        </Row>
                      </Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  <Image src={user} className="nav_user noselect me-3" />
                  {/* <span className="color-white">{auth.name}</span> */}
                </div>
              )}
            </Col>
          </Row>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items ps-0">
            <li className="navbar-toggle justify-content-end pe-3">
              <Link to="#" className="menu-bars">
                <AiOutlineLeft onClick={showSidebar} size={25} />
                {/* <FaBars onClick={showSidebar} /> */}
              </Link>
            </li>
            {mainSidebar?.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path === '/channel' ? item.path + '/me' : item.path}>
                    <span className="m-0 p-0 flex-shrink-0">{item.icon}</span>
                    <span className="ps-2 color-white">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {isUserAuthenticated() ? (
              <li className="nav-text">
                <a className="cursor-pointer" onClick={() => resetAuth()}>
                  <CgLogOut size={25} />
                  <span className="ps-2 color-white">Logout</span>
                </a>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
