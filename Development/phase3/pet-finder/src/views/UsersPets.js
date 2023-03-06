import { useStore } from "zustand";
import { petskeeper } from "../data/PetsKeeper";
import PetCard from "../componets/PetsCard";
import Delete from "../componets/DeletePets";
import Edit from "../componets/EditPets";
import AddPet from "../componets/AddNewPets"
import { Link } from "react-router-dom";

function Mypets(){
const myPets = useStore(petskeeper);
return(
    <>
<div >
<h1 >Petfinder</h1>
<div >
<Link exact to="/allpets"><p>View all pets</p></Link>
<Link exact to="/"><p >Home</p></Link>
<AddPet user_id={myPets.petsData.user_id}/>
</div>
</div>
<div >
{
myPets.petsData.map((pet)=>{
return <>
    <PetCard pet={pet}/>
    <div >
    <Delete pet={pet}/>
    <Edit pet={pet}/>
    </div>
    </>
})
}
</div>
    </>
)


}

export default Mypets