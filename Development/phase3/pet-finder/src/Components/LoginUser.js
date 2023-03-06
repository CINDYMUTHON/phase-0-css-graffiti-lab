
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useEffect} from "react"
import axios from "axios";
import { useStore } from "zustand";
import { petskeeper } from "../data/PetsKeeper";

function Login() {
  const pets = useStore(petskeeper)
  const [users,setUsers] = useState([])
  console.log(users)
  useEffect(()=>{
   axios.get("https://ismahan-sinatra-backend.onrender.com").then((r) =>
    setUsers(r.data)
   )
  },[])
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  
  const redirect = useNavigate();
  const handleSubmit = (e) => {
     e.preventDefault();
    //map through the users array
    let exixting_user = users.filter((user) =>{
      return user.username === login.username
    })
    if(exixting_user.length !== 0){
    if(exixting_user[0].password === login.password){
    
      axios.get(`https://ismahan-sinatra-backend.onrender.com/pets/${exixting_user[0].username}`).then((r) =>{
      if(r.data.length === 0){
        pets.setPetsKeeper([{
        id:null,
        name:"",
        breed:"",
        image_url:"",
        user_id:exixting_user[0].id
            }]) 
            redirect("/mypets")}else{
        console.log(r.data)
        pets.setPetsKeeper(r.data) 
        redirect("/mypets")} 
      }    
      )
 
    }else{
      alert("Incorrect password")
    }}else{
      alert("Incorrect username")
    }
  
   
  };
  return (
    <div >
    <form onSubmit={handleSubmit} className="signin">
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="username"
        onChange={(e) => setLogin({ ...login, username: e.target.value })}
      ></input>
      <input type="password" placeholder="password" onChange={(e) => setLogin({
        ...login, password:e.target.value
      })} ></input>
      <button >Login</button>
    </form>
    </div>
  );
}
export default Login;