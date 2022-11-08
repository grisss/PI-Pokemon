import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import { getType, postPokemon } from "../actions/index";
import { Link } from "react-router-dom";
import '../Estilos/Create.css'

function validate(pokemon){
    let errors = {};
    if (!pokemon.name){
    errors.name = "Ingrese un nombre" 
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
    speed: "",
    height: 0,
    weight: 0,
    });

    useEffect(() => 
    {dispatch(getType());
    }, [dispatch]);

    function handleSelect(e) {
    setPokemon({
        ...pokemon,
        type: [...pokemon.type, e.target.value],
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
    alert("El pokemon fue creado con exito");
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
        <div className="container10">
    <form  onSubmit={onSubmit}>
        <h3 className="titulo"> ¡Crea tu pokemon!</h3>
        <p>
        <label className="Nombre"> Nombre </label>
        <input
            onChange={onInputChange}
            id="name"
            name="name"
            type="text"
            value={pokemon.name}
            required
            className="input1"
        />
        {errors.name && <p className="error"> {errors.name}</p>}
        </p>

        <p>
        <label className="Imagen">Imagen </label>
        <input
            onChange={onInputChange}
            name="image"
            type="text"
            value={pokemon.image}
            className="input2"
        />
        </p>

        <p>
        <label className="Vida">Vida </label>
        <input
            onChange={onInputChange}
            name="life"
            type="number"
            value={pokemon.life}
            className="input3"/>
        </p>
    
        <p>
        <label className="Fuerza1">Fuerza </label>
        <input
            onChange={onInputChange}
            name="attack"
            type="number"
            value={pokemon.attack}
            className="input4"
        />
        </p>
    
        <p>
        <label className="Defensa1">Defensa </label>
        <input
            onChange={onInputChange}
            name="defense"
            type="number"
            value={pokemon.defense}
            className="input5"
        />
        </p>
    

        <p>
        <label className="Velocidad1">Velocidad </label>
        <input
            onChange={onInputChange}
            name="speed"
            type="number"
            value={pokemon.speed}
            className="input6"
        />
        </p>
        
        <p>
        <label className="Altura1">Altura </label>
        <input
            onChange={onInputChange}
            name="height"
            type="number"
            value={pokemon.height}
            className="input7"
        />
        </p>

        <p>
        <label className="Peso1">Peso</label>
        <input
            onChange={onInputChange}
            name="weight"
            type="number"
            value={pokemon.weight}
            className="input8"/>
        </p>

        <p>
            <div>
        <select className="fle" onChange={handleSelect}>
            {types.map((e) => (
            <option  value={e.name}>{e.name}</option>
            ))}
        </select>
        </div>
        <ul>
            <p>{pokemon.types.map((e) => e + " , ")}</p>
        </ul>
        </p>
        <Link to="/home">
        <button className="atras">Atrás</button><button className="crear" >Crear</button>
        </Link>
        </form>
        </div>
    );
}