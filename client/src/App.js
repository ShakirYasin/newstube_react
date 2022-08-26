import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './css/App.css'
import Home from "./components/Home";
import Subscriptions from "./components/Subscriptions";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Channel from "./components/channel"
import Accounts from "./components/accounts"
import UserContext from './context/UserContext'
import SingleNews from "./components/News/SingleNews";
import History from "./components/history";



const App = () => {

  const { isUserAuthenticated, isCreator } = useContext(UserContext)

  return (
    <Router>
      <Navbar />
      <div className="default-margin">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news' />
          <Route path='/news/:id' element={<SingleNews />} />
          <Route path='/library' />
          <Route path='/history' element={<History />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/accounts' element={<Accounts />} />
          <Route path='/login' element={!isUserAuthenticated() ? <Login /> : <Navigate replace to='/' />} />
          <Route path='/signup' element={!isUserAuthenticated() ? <Register /> : <Navigate to='/' />} />
          <Route path='/channel/:id' element={<Channel />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App