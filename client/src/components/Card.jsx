import React from "react";
import '../Estilos/Card.css'

export default function Card({name, types, image}){
    return(
        <div className="card">
        <img className="imagen" src={image} alt=''/>
        <ul>
        <option className="types1">{types}</option>
        </ul>
        <ul >
        <option className="name1">{name}</option>
        </ul>  
        </div>

    )
}

