import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPoke } from '../actions/index'
import '../Estilos/SearchBar.css'


export default function SearchBar() {
const dispatch = useDispatch();
const [name, setName] = useState("")



const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPoke(name))
}

return (
    <div>
    <input
    className="input-M"
        type="text"
        onChange= {(e) => handleInputChange(e)}
        autoFocus
        placeholder="Buscar..."
    />
    <button  className="Search-button"  type="submit" onClick= {(e) => handleSubmit(e)}> Buscar </button>
    </div>
);
}