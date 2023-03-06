import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
// import Home from "./Components/Home"
import SingleDog from "./Components/HomePage"
import LoginPage from "./Components/LoginPage"
import RegisterPage from "./Components/RegisterPage"
import LandingPage from "./Components/LandingPage"
import Search from "./Components/Search"
import AddPet from "./Components/AddNewPets"
// import './index.css'
function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/pets" element={<SingleDog />}></Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={< RegisterPage />} />
            <Route path="/new" element={< AddPet />} />

            <Route path="/:name" element={<SingleDog />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/" element={<LandingPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App