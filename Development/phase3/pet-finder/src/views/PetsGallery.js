
import PetCard from "../componets/PetsCard";
import { useStore } from "zustand";
import { petskeeper} from "../data/PetsKeeper";
import Search from "../componets/SearchForPets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function AllPets(){
    const pets = useStore(petskeeper)
    const [myPets, setMyPets] = useState([]);
useEffect(() => {
//this will be the fetch to a specific users pets
axios.get("https://ismahan-sinatra-backend.onrender.com/pets").then((r) => setMyPets(r.data));
    }, []);
    useEffect(() => {
      pets.setPetsKeeper(myPets);
    }, [myPets]); 
    return (<>
      
      <div >
      <h1 >Petfinder</h1>
      <Link exact to="/"><p >Home</p></Link>
       <Search/>
       </div>
     
       {pets.petsData.map((pet)=>{
     return <PetCard pet={pet}/>
       })}
       </>
    )
}
export default AllPets;