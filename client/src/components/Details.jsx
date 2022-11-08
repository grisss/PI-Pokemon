import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {getDetail} from '../actions/index'
import {Link} from 'react-router-dom'
import '../Estilos/Detail.css'
import IMG from '../imagenes/celine.jpg'

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id]);


    let detalle = useSelector((state) => state.detail);

    return(
        <div>
            {
            detalle.length>0?
            <div>
                <div className="container5">
                    <div className="container6">
                <h2 className="ID">ID=</h2>
                <h3 className="poke-ID"><p>N°: {detalle[0].id}</p></h3>
                <h2 className="nombre">NOMBRE=</h2>
                    <h2 className="name2">{detalle[0].name}</h2>
                <img src={detalle[0].image} alt='' className="Poke-img" />
                </div>
                </div>
                <h2 className="detalle">DETALLES=</h2>
                    <h3 className="velocidad">Velocidad: {detalle[0].speed}</h3>
                    <h3 className="vida">Vida: {detalle[0].life}</h3>
                    <h3 className="fuerza">Fuerza: {detalle[0].attack}</h3>
                    <h3 className="defensa">Defensa: {detalle[0].defense}</h3>
                    <h3 className="altura">Altura: {detalle[0].height}</h3>
                    <h3 className="peso">Peso:{detalle[0].weight}</h3>
            

            </div>:<h2 className="loading">Espere...</h2>
            }
            <div>
                <Link to= '/home/'> 
                <button className="volver">Volver</button>
                </Link>
            </div>
            <img src={IMG} alt='' className="image3"/>

        </div>
    )
}