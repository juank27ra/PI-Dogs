import React from 'react'
import style from '../css/Card.module.css'

export default function Card({name, weight, temperament, image}) {
  return (
    <div >
    <h3>{name}</h3>
    <h5>{weight}</h5>
    <h5>{temperament}</h5>
    <img className={style.card} src={image} alt='imag not found' width='200px' height= '250px'/>
    </div>
  )
}
