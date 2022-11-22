import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import { getType, postPokemon } from "..//actions/index.js";
import { Link } from "react-router-dom";
import "../Estilos/Create.css"




function validate(pokemon){
let errors = {};
if (!pokemon.name){
    errors.name = "Se requiere un nombre"
} return errors
}

export default function PokemonCreate() {
const dispatch = useDispatch();
const history = useHistory();
const types = useSelector((state) => state.types);

const [errors,setErrors] = useState({});

const [pokemon, setPokemon] = useState({
    name: "",
    types: [],
    image: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
});

useEffect(() => {
    dispatch(getType());
}, [dispatch]);

function handleSelect(e) {
    setPokemon({
    ...pokemon,
    type: [...pokemon.types, e.target.value],
    });
}


function onInputChange(e) {
e.preventDefault();
setPokemon({
    ...pokemon,
    [e.target.name]: e.target.value,
});
setErrors(
    validate({
    ...pokemon,
    [e.target.name]: e.target.value,
    })
);
}

function onSubmit(e) {
e.preventDefault();
dispatch(postPokemon(pokemon));
alert("Personaje creado con exito");
setPokemon({
    name: "",
    types: [],
    image: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
});
history.push("/home");
}


return (
    <div>
    <form className="container10" onSubmit={onSubmit}>
    <h3 className="titulo"> ¡Crea tu pokemon!</h3>
    
        <label className="name100"> Nombre: </label>
        <input
        onChange={onInputChange}
        id="name"
        name="name"
        type="text"
        value={pokemon.name}
        required
        className="input"
        autoFocus
        />{" "}
        {errors.name && <p className="error"> {errors.name}</p>}

        <label className="name100">Imagen: </label>
        <input
        onChange={onInputChange}
        name="image"
        type="text"
        value={pokemon.image}
        className="input"
        />{" "}

        {" "}
        <label className="name100">Vida: </label>
        <input
        onChange={onInputChange}
        name="life"
        type="number"
        value={pokemon.life}
        className="input"
        />{" "}
    

        <label className="name100">Fuerza: </label>
        <input
        onChange={onInputChange}
        name="attack"
        type="number"
        value={pokemon.attack}
        className="input"
        />{" "}


        <label className="name100">Defensa: </label>
        <input
        onChange={onInputChange}
        name="defense"
        type="number"
        value={pokemon.defense}
        className="input"
        />{" "}

        <label className="name100">Velocidad:  </label>
        <input
        onChange={onInputChange}
        name="speed"
        type="number"
        value={pokemon.speed}
        className="input"
        />{" "}

        {" "}
        <label className="name100">Altura: </label>
        <input
        onChange={onInputChange}
        name="height"
        type="number"
        value={pokemon.height}
        className="input"
        />{" "}

        <label className="name100">Peso: </label>
        <input
        onChange={onInputChange}
        name="weight"
        type="number"
        value={pokemon.weight}
        className="input"
        />{" "}

        {" "}
        <p className="types-s">
        <select className="fle" onChange={handleSelect}>
        {types.map((e) => (
            <option value={e.name}>{e.name}</option>
        ))}{" "}
        </select>
        <ul>
        <li>{pokemon.types.map((e) => e + " , ")}</li>
        </ul>
        </p>
        <Link to="/home">
    <button type="submit" className="atras-Crear">Atrás</button></Link><button type="submit" className="atras-Crear">Crear</button>
    </form>
    </div>

);
}