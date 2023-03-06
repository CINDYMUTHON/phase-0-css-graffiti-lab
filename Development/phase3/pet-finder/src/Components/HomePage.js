import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Search from "./Search"
import axios from "axios";
import { useStore } from "zustand";
import { petskeeper } from "../data/PetsKeeper";

export default function HomePage() {
    const [dog, setDog] = useState([])
    const { name } = useParams()

    const pets = useStore(petskeeper);


    const handleDelete = async (pet) => {
        axios
            .delete(`http://localhost:9292/pets/${pet}`)
            .then(() => {
                fetchSingleDogData()
            });
    };

    const fetchSingleDogData = async () => {
        try {
            console.log(name)
            const res = await fetch(
                `http://localhost:9292/pets`
            )
            const data = await res.json()
            setDog(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        fetchSingleDogData()
    }, [name])

    return (
        <>
            <section className="grid max-w-5xl mx-auto flex items-center justify-center h-screen">
                <br />
                <Search />
                <Link
                    to="/new"
                    className="inline-block bg-slate-600 py-2 px-6 rounded mt-8 text-white hover:bg-slate-500 transition-all duration-200"
                >
                    &larr; New Pet
                </Link>
                {dog.map((item) => (
                    <div
                        key={item.id}
                        className="grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center"
                    >
                        <article>
                            <img
                                src={item.image_url}
                                alt={item.name}
                            />
                        </article>
                        <article>
                            <h1 className="text-3xl font-bold text-white mb-8 lg:text-5xl">
                                {item.name}
                            </h1>
                            {item.description && (
                                <p className="text-slate-400 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">
                                    {item.description}
                                </p>
                            )}

                            <ul className="text-sm text-slate-400 leading-loose lg:text-base lg:leading-relaxed">
                                <li>
                                    <span className="font-bold text-slate-200">Bred For:</span>{" "}
                                    {item.bred_for}
                                </li>
                                <li>
                                    <span className="font-bold text-slate-200">Height:</span>{" "}
                                    {item.height?.metric} cm
                                </li>
                                <li>
                                    <span className="font-bold text-slate-200">Weight:</span>{" "}
                                    {item.weight?.metric} kgs
                                </li>
                                <li>
                                    <span className="font-bold text-slate-200">Breed Group:</span>{" "}
                                    {item.breed_group}
                                </li>
                                <li>
                                    <span className="font-bold text-slate-200">Lifespan:</span>{" "}
                                    {item.life_span}
                                </li>
                                <li>
                                    <span className="font-bold text-slate-200">Temperament:</span>{" "}
                                    {item.temperament}
                                </li>
                            </ul>

                            <Link
                                onClick={e => { handleDelete(item.id) }}
                                className="inline-block bg-slate-600 py-2 px-6 rounded mt-8 text-white hover:bg-slate-500 transition-all duration-200"
                            >
                                🗑️ Delete Pet
                            </Link>
                        </article>
                    </div>
                ))}
            </section>
        </>
    )
}