import React from "react";
import { Link } from "react-router-dom";
import style from "../css/LandingPage.module.css"


export default function LandingPage() {
  return (
    <div className={style.bv}>
        <h1 >Bienvenidos a Tu Apps de Perros</h1>
        <Link to = {'/home'} >
            <button>Ingresar</button>
        </Link>
    </div>
  )
}
