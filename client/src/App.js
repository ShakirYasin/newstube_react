import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Subscriptions from "./components/Subscriptions";
import Navbar from "./components/Navbar";
import './css/App.css'


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news' />
          <Route path='/library' />
          <Route path='/subscriptions' element={<Subscriptions />} />
        </Routes>
      </Router>
    </>
  )
}

export default App