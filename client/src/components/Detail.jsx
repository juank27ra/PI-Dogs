import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import style from "../css/Detalles.module.css"

export default function Detail(props) {
    // console.log(props) 
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))   // tambien con el hooks useParams de react router dom
    }, [dispatch, props.match.params.id])

    const myDog = useSelector ((state) => state.detail)        // me lo traigo del reducer

    return(
        <div>
       
            {
                myDog ? 
                <div className={style.detail}>
                    <h1>Soy {myDog[0].name}</h1>
                    <img className={style.img} src= {myDog[0].image ? myDog[0].image : myDog[0].image} alt=""/> 
                    <h3>Tempermentos: {!myDog[0].createInDb ? myDog[0].temperament + ' ' : myDog[0].temperaments.map(e => e.name + (' '))} </h3>
                    <h4>Altura: {myDog[0].height}</h4>
                    <h4>Peso: {myDog[0].weight}</h4>
                    <Link to='/home'><button>Volver</button></Link>
                </div> : <p>Loading...🐕🐕🐕</p>
            }
           
        </div>
    )

}

// line 22 img para arreglar en css         line 20 myDog.length > 0 ?