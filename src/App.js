import React, { useState } from 'react'
import './index.css'
import Dashboard from './Dashboard/Dashboard'
import InputChat from './InputChat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Login from './LandingPage/Login'
import SignUp from './LandingPage/SignUp'


const App = () => {
  const [chatResponse, setChatResponse] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard setChatResponse={setChatResponse}/>} />
        <Route path="/inputchat/:value" element={<InputChat/>} />
        <Route path='/loginpage' element={<Login />} />
        <Route path='/signuppage' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App