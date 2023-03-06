import axios from "axios";
import { useStore } from "zustand";
import { petskeeper } from "../data/PetsKeeper";

function Search() {
    const pets = useStore(petskeeper)
    const handleSearch = (e) => {
        console.log(e.target.value)
        axios.post("http://localhost:9292/pets/search", {
            query: e.target.value
        }).then((r) =>
            pets.setPetsKeeper(r.data)
        )
    }
    return (
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search by name or breed" onChange={handleSearch}></input>
    )
}
export default Search;
