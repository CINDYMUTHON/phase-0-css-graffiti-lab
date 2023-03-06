
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import '../App.css'
export default function SignInPage() {
    // let 
    let [login, setLogin] = useState(null)
    return (
        <div className=" text-center m-20 w-1/2 auto">
            <h2 className="text-2xl text-white">Sign in </h2>
            <br/>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="/pets">
                <p className="">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        {/* Username or email address */}
                    </label>
                    <br />
                    <input type="text"
                        placeholder='Username or email'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="first_name" required onChange={(e => {
                            setLogin({ ...login, username: e.target.value })
                        })} />
                </p>
                <p className="">
                    <br />

                    <input type="password" name="password" placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' required onChange={e => {
                        setLogin({ ...login, password: e.target.value })
                    }} />
                </p>
                <br />
                <button className="btn bg-green-200" type="submit">Login</button>
            </form>
            <p><Link to="/">Back to Homepage</Link>.</p>

            <footer >
                <p className="paragraph">First time? <Link to="/register">Create an account</Link>.</p>
                <Link to="/forget-password"><label className="right-label">Forgot password?</label></Link>
            </footer>
        </div>
    )
}