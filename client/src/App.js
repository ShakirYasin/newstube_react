import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Subscriptions from "./components/Subscriptions";
import Navbar from "./components/Navbar";
import './css/App.css'
import Login from "./components/Login";
import Register from "./components/Register";
import Channel from "./components/channel"
import UserContext from './context/UserContext'



const App = () => {

  const { isUserAuthenticated, isCreator } = useContext(UserContext)
  return (
    <Router>
      <Navbar />
      <div className="default-margin">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news' />
          <Route path='/library' />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/login' element={!isUserAuthenticated() ? <Login /> : <Navigate replace to='/' />} />
          <Route path='/signup' element={!isUserAuthenticated() ? <Register /> : <Navigate to='/' />} />
          <Route path='/channel' element={isUserAuthenticated() && isCreator() ? <Channel /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App