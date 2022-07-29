import React, {Fragment, useEffect, useState } from "react";
// import {useState, useEffect,Component } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs, filterByTemperament, filterCreated, filterByName } from "../actions";
import {Link}  from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
// import DogsCreate from "./DogsCreate";
import style from "../css/Home.module.css"



export default function Home() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.dogs)
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [dogsPerPage, setDogsPerPage] = useState(8)
  const indexOfLastDog = currentPage * dogsPerPage; //1*8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

  const paginado = (pageNumber) =>{             // funcion paginado que recibe un numero de pag
    setCurrentPage(pageNumber)                  // y setea el estadod e la actual pág con el num recibido
  }

useEffect(() =>{
    dispatch(getDogs());
},[dispatch])

function handleClick(e) {                   //vuelvo a cargar todos los dogs
    e.preventDefault();
    dispatch(getDogs())
}

function handleFilterByName(e) {
    e.preventDefault();                         //previene que mi pagina se actualice por defecto
    dispatch(filterByName(e.target.value));
    setCurrentPage(1);                             //setea mia ctual page en 1
    setOrder(`Ordenado ${e.target.value}`)
}
function handleFilterTemperament(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByTemperament(e.target.value)) // esto es cada valor de cada una de las aaciones que se le pasa al cliente
}

function handleFilteredCreated(e) {                //filtrado por donde viene 
    dispatch(filterCreated(e.target.value))
}

return (        // solo "/ "  link de crear Perro
    <div className={style.home}>
        <br/>
        <br/>
        <Link to = {'/dogs'}>
        <button>Crear Perro 🐶</button>
        </Link>   

        <h1>Encuentra tus Perros aquí</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los Perros
            </button>
        <div>
            <select onChange={e => handleFilterByName(e)}>
                <option value='All'>Todos</option>
                <option value='Asc'>A-Z</option>
                <option value='Desc'>Z-A</option>       
            </select>       
            {/* <select por peso >
                <option value='All'>Todos</option>
                <option value='Min'>Menor Peso</option>
                <option value='Max'>Mayor Peso</option>
            </select> */}
            <select onChange={e => handleFilterTemperament(e)}>
                <option value='Asc'>Ascendente</option>
                <option value='Desc'>Descendente</option>
            </select>
            <select onChange={e => handleFilteredCreated(e) }>
                <option value='All'>Todos</option>
                <option value='Created'>Creados</option>
                <option value='Api'>Existentes</option>
            </select>
        </div>
        <div className={style.card}>
            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
            /> 
        </div>
                                           
            {currentDogs?.map(e => {
            <SearchBar/>                                                
                    return (
                        <Fragment>
                        <Link to = {"/home/" + e.id }>
                        <Card 
                           
                            key={e.id}
                            name = {e.name} 
                            weight={e.weight} 
                            temperament={e.temperament} 
                            image={e.image? e.image : e.image}
                            onClose={() => alert(e.name)}
                            />       
                        </Link>   
                        </Fragment>
                    )
                })
            }
            
        
    </div>
)

}


 // image={e.image? e.image : <image src= 'url.....'/>
 // lin 94 searchBar componente para hacer busqueda por coincidencias