
import { useState } from "react"
import axios from "axios"
import { useStore } from "zustand"
import { petskeeper } from "../data/PetsKeeper"

function AddPet({ user_id }) {
    const pets = useStore(petskeeper)
    const [displayForm, setdisplayForm] = useState(false)
    const [newPet, setNewPet] = useState({
        "name": "",
        "breed": "",
        "image_url": "",
        "user_id": user_id
    })
    //console.log(newPet)
    const handleSubmit = (e) => {
        e.preventDefault()
        setdisplayForm(false)
        console.log(newPet)
        axios.post(`http://localhost:9292/pet`, newPet).then((r) =>
            pets.setPetsKeeper([...pets.petsData, r.data])
        );
    }

    if (displayForm === false) {
        return <button className="btn bg-green-200 outlined"
            onClick={() => setdisplayForm(true)
            } >Add new pet</button>
    } else {
        return <form onSubmit={handleSubmit} className="text-center m-20 w-1/2 auto">
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name" onChange={(e) => {
                setNewPet({ ...newPet, "name": e.target.value })
            }} />
            <p></p>
            <p></p>
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Breed" onChange={(e) => {
                setNewPet({ ...newPet, "breed": e.target.value })
            }} />
            <br />
            <input type="url" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Image" onChange={(e) => {
                setNewPet({ ...newPet, "image_url": e.target.value })
            }} />
            <p></p><br/>
            <button type="submit" className="btn bg-green-200 outlined" >Add new Pet</button>
        </form>
    }

}

export default AddPet;