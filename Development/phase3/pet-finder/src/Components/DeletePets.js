import axios from "axios";
import { useStore } from "zustand";
import { petskeeper } from "../data/PetsKeeper";

function Delete({pet}) {
  const pets = useStore(petskeeper);
  let other_pets = pets.petsData.filter((thispet)=>{
    return thispet.id !== pet.id
   })
  const handleDelete = () => {
    axios
      .delete(`https://ismahan-sinatra-backend.onrender.com/pets/${pet.id}`)
      .then(() => pets.setPetsKeeper(other_pets));
  };
  return <button onClick={handleDelete} id="delete-btn"> Delete</button>;
}

export default Delete;