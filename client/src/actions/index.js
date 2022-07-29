import axios from 'axios';
export const GET_DOGS = "GET_DOGS"
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT'
export const FILTER_CREATED = 'FILTER_CREATED'
export const FILTER_BY_NAME = 'FILTER_BY_NAME'
export const GET_NAME_DOGS = 'GET_NAME_DOGS'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const POST_DOGS = 'POST_DOGS'
export const GET_DETAIL = 'GET_DETAIL'

export const getDogs = (name) => {
    return async (dispatch) =>{
      if(name){
        return await axios.get(`http://localhost:3002/?name=${name}`)
        .then(res => res.data)
        .then(res =>
          {
            dispatch({ type: GET_DOGS, payload: res})
          })
      }
      let json = await axios.get('http://localhost:3002/');
      return dispatch({
          type: 'GET_DOGS',
          payload: json.data,
      })
    }}

export const getTemperaments = () => {
     return async (dispatch) => {
     var info = await axios('http://localhost:3002/temperaments')
     return dispatch({type: GET_TEMPERAMENTS, payload: info.data})
  }}

export const postDogs = (payload) => {
  return async (dispatch) => {
    var json = await axios.post('http://localhost:3002/', payload)          //////////////
    return dispatch({
          type: POST_DOGS,
          payload: json.data,
      })
  }}


export function getNameDogs(name){
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3002/?name=${name}`)
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: json.data
      })
    }catch(e){
        console.log(e)
    }
  }
}

export const filterByTemperament = (payload) => {    //aqui payload es lo que yo le mando desde el componente
  return {
      type: 'FILTER_BY_TEMPERAMENT',                     // el type sirve para acceder en el reducers
      payload
  }
}

export const filterCreated = (payload) => {   
  return {
      type: 'FILTER_CREATED',                   
      payload
  }
}

export const filterByName = (payload) => {
  return {
    type: 'FILTER_BY_NAME',
    payload
  }
}

export const getDetail = (id) => {
  return async (dispatch) => {
    try{
      var json = await axios.get(`http://localhost:3002/${id}`);
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

// export const getTemperaments = (name) => {{
//   return async (dispatch) => {
//     if(name){
//       // return axios.get('http://localhost:3002/temperaments')
//       return axios.get(`http://localhost:3002/temperaments/?name=${name}`)
//       .then(res => res.data)
//       .then(res =>
//     {
//       dispatch({ type: FILTER_BY_TEMPERAMENT, payload: res})
//     })
//     }
//   }
// }}