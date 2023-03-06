import { useState } from "react";
import Register from "../componets/RegisterUsers";
import Login from "../componets/LoginUser";

function Home() {
  const [displayRegister,displayLogin] = useState(true)
  const changeForm = () =>{
    displayLogin(!displayRegister)
  }
if(displayRegister === true){
  return (<>
    <h1>Petfinder</h1>
    <Register changeForm={changeForm}/>
    <p onClick={changeForm}>Already registered? Go to login</p>
    </>);
}else{
  return (<>
    <h1 >Petfinder</h1>
    <Login changeForm={changeForm}/>
    </>);
}
}

export default Home;