import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {postDogs, getTemperaments} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";
import style from '../css/DogsCreate.module.css'


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un Nombre';
    }else if (!input.weight){                                   //imput tiene la propiedad require para que sea requerido texto en cualquier campo
        errors.weight = 'se requiere el Peso en Kg';            //hacer validacion por back y front es la mejor opcion
    }else if(!input.height){
        errors.height ='Se requiere Altura en Cm';
    }
    return errors;
}

export default function DogsCreate() {
    const dispatch = useDispatch()
    const history = useHistory()                            // history, lo que hace es redirigirme a la ruta que yo le diga
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        weight: '',
        height: '',
        life_span: '',
        image: '',
        temperaments: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleChange=(e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]               // aqui en el estado me va a guardar cada vez que seleccione un temperamento en un array
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDogs(input))
        alert('Perro Creado😊😊!!')
        setInput({
            name: '',
            weight: '',
            height: '',
            life_span: '',
            image: '',
            temperaments: []
        })
        history.push('/home')               //esto para que de una me lleve al home porque ya se creó el perro
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(el => el !== e)
        })
    }


    return (
        <div className={style.dgc}>
        <br></br>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea Tu Perro</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={(e) => handleChange(e)}
                    placeholder='Nombre'
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Peso:</label>
                    <input
                    type= 'text'
                    value= {input.weight}
                    name= 'weight'
                    onChange={(e) => handleChange(e)}
                    placeholder='Peso'
                    />
                    {errors.weight && (
                        <p className="error">{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Altura:</label>
                    <input
                    type= 'text'
                    value= {input.height}
                    name= 'height'
                    onChange={(e) => handleChange(e)}
                    placeholder='Altura'
                    />
                    {errors.height && (
                        <p className="error">{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida:</label>
                    <input
                    type= 'text'
                    value= {input.life_span}
                    name= 'life_span'
                    onChange={(e) => handleChange(e)}
                    placeholder='Años de vida'
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type= 'text'
                    value= {input.image}
                    name= 'image'
                    onChange={(e) => handleChange(e)}
                    placeholder='Imagen'
                    />
                </div>
                <div>
                    <label>Temperamento:</label>
                    <input
                    type= 'text'
                    value= {input.temperaments}
                    name= 'temperaments'
                    onChange={(e) => handleChange(e)}
                    />
                {/* </div> */}
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>

                 <p>{input.temperaments.map(e => e + " ,")}</p>
                <button disabled={Object.keys(errors).length} type={'submit'}>Crear Perro</button>   
                </div>


                  
            </form>

                {input.temperaments.map(e => 
                <div>
                <p>{e}</p>
                <button onClick={() => handleDelete(e)}>x</button>
                </div>
                )}
        </div>
    )
   

}

// 156 una lista que me va a tomar cada cosa que vaya seleccionando en el select, y aqui es donde el usuario puede ver lo que fue seleccionando