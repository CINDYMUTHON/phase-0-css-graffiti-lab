import React from 'react'
import { Link } from 'react-router-dom'
export default function LandingPage() {
    return (
        <header className= "LandingPage-body" style={ HeaderStyle }>
            <p className='p-32'></p>
            <h1 className="main-title text-center">Welcome to Petfinder </h1>
            <p className='p-5'></p>

            <p className="main-para text-center">
                </p>
            <div className="grid gap-1 buttons text-center">
                
                <Link to="/login">
                    <button className="btn bg-green-200">Login</button>
                </Link>
                <Link to="/register">
                    <button className="btn bg-green-200 outlined" id="reg_btn"><span>Register </span></button>
                </Link>
            </div>
        </header>
    )
}
const HeaderStyle = {
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color:"white"
}