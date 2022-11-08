import React from "react";
import { Link } from "react-router-dom";
import '../Estilos/NavBar.css'

export default function NavBar() {
    return (
    <header id="navegador">
        <Link to="/">
        </Link>
        <div> 
        <Link className="poke" to="/create" >Crear Pokemon</Link>
        </div>

    </header>

);
}