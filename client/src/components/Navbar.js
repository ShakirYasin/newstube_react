import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { Link } from "react-router-dom";
import { SidebarData, creatorSidebar } from "../data/SidebarData";
import "../css/Navbar.css";
import { IconContext } from "react-icons";
import { Col, Image, Row } from "react-bootstrap";
import UserContext from "../context/UserContext";
import axios from "../components/axios";
import user from "../images/users/user1.jpg";

import NewsContext from "../context/NewsContext";

const Navbar = () => {
  const { news } = useContext(NewsContext);
  const { auth, resetAuth, isUserAuthenticated, isCreator } =
    useContext(UserContext);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [mainSidebar, setMainSidebar] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
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

  const handleSearch = (value) => {
    setSearch(value)
    if (value && news) {
      const newNews = news.filter((news) => {
        if (news.title.toString().toLowerCase().includes(value)) {
          return news.title
        }
        else if (news.description.toString().toLowerCase().includes(value)) {
          return news.description
        }
      });
      setSearchResults(newNews);
    }
  };

  useEffect(() => {
    if (search.length > 0 && searchResults.length > 0) {
      setSearchPane(true)
    }
    else {
      setSearchPane(false)
    }
    console.log(searchResults)
  }, [searchResults, search])

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
                <h3 className="color-white text-center ms-5">NewsTube</h3>
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
                        searchResults.map(result => (
                          <li>
                            <p className="m-0">{result.title} <span className="ms-auto font_12 secondary">{result.description}</span></p>
                          </li>
                        ))
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
                  <Image src={user} className="nav_user noselect me-3" />
                  <span className="color-white">{auth.name}</span>
                </div>
              )}
            </Col>
          </Row>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items ps-0" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {mainSidebar?.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path === '/channel' ? item.path + '/' + auth._id : item.path}>
                    {item.icon}
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
