import React from "react";
import {Link} from "react-router-dom"
import '../Estilos/LandingPage.css'
import IMG from '../imagenes/carolina.jpg'

export default function LandingPage(){
    return(
        <div>
            <h1 className="title1">BIENVENIDOS </h1>
            <div>
                <Link to= "/home">
                <button className="button">INGRESAR</button>
                </Link>
                <img className="lorem" src={IMG} alt=''/>
                <hr className="h"/>
                <div>
                    <hr />
                </div>
                </div>
        </div>
    )
}