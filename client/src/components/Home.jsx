import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterCreated,
  Sort,
  filterByAttack
} from "../actions/index.js";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import '../Estilos/Home.css'
import IMG from '../imagenes/pokemon.jpg'

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons) 
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    dispatch(filterByAttack(e.target.value));
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
  }

 

  return (
    <>
      <NavBar />
      <SearchBar />
      <div >
      <div>
        <h1 className='Title2'> Pokémon</h1>
      </div>
      <img className="imagen2" src={IMG} alt=''/>
        <div>
          <select className='A' onChange={onSelectsChange} >
            <option value="Filtro"> A/Z:</option>
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
          </select>
          <select className='Fuerza' onChange={handleFilterAttack}>
            <option value="Fuerza"> Fuerza </option>
            <option value="Mayor fuerza">Mayor fuerza</option>
            <option value="Menor fuerza">Menor fuerza</option>
          </select>
          <select className='Tipo'  onChange={handleFilterType}>
            <option value="type"> Tipo </option>
            <option value="normal"> Normal </option>
            <option value="flying"> Flying </option>
            <option value="poison"> Poison </option>
            <option value="ground"> Ground </option>
            <option value="bug"> Bug </option>
            <option value="fire"> Fire </option>
            <option value="water"> Water </option>
            <option value="grass"> Grass </option>
            <option value="electric"> Electric </option>
            <option value="fairy"> Fairy </option>
          </select>
          <select className='Todos' onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          <div className="container">
          {currentPokemons?.map((e) => {
              return (
                <div>
                  <Link className="Sub"  to={"/home/" + e.id}>
                    <Card 
                      name={e.name} image={e.image} types={e.types}  key={e.id}  
                    />
      
                  </Link>
                </div>
              );
            })} 
            </div>

        </div>
              
        <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
      </div>
    </>
  );
}
export default Home;
