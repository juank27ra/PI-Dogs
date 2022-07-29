import React from 'react';
import css from '../css/Paginado.module.css'


export default function Paginado({dogsPerPage, allDogs, paginado}) {
    const pageNumber = [];

    for (let i = 0; i<=Math.ceil(allDogs/dogsPerPage); i++) {        //numero redondo del totasl de perros dividido el nuem ro que quiero por pagina 
       pageNumber.push(i+1)                                            //para que me de un arreglo de numero que van a ser mis páginas
    }
  
    return (
        <nav>
            <ul className={css.paginado}>
                {pageNumber && 
                pageNumber.map(number =>(
                    <li className={css.number} key={number}>                    
                    <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
   // line 16 desps del class                   17 {n} en medio del button  17 para que sean numeros y no lista de items con punto

}
