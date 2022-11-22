import React from "react";
import '../Estilos/Paginado.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);}
    
    return (
    <nav className="numBox">
        {pageNumbers &&
        pageNumbers.map(number => {
        return <div  key ={number}>
        <button className="indexCont" onClick={() => paginado(number)}>{number}</button>
            </div>
        })}
    </nav>
);
}