import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Home from "./Components/Home"
import SingleDog from "./Components/HomePage"
import LoginPage from "./Components/LoginPage"
import RegisterPage from "./Components/RegisterPage"
import HomePage from "./Components/HomePage"
import LandingPage from "./Components/LandingPage"
import ForgetPasswordPage from "./Components/ForgetPasswordPage"
// import './index.css'
function App() {
  return (
    <>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/:name" element={<SingleDog />}></Route>
          <Route path="/home" element={< HomePage />} />
          <Route path="/" element={<LandingPage />} />
          
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App