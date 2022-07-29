import { GET_DOGS, POST_DOGS,  FILTER_BY_TEMPERAMENT, FILTER_CREATED, FILTER_BY_NAME, GET_NAME_DOGS, GET_TEMPERAMENTS, GET_DETAIL} from '../actions/index'

const initialState = {
    dogs: [],
    allDogs:[],
    temperaments: [],
    // detail: [],

}

export default function rootReducers(state = initialState, action) {
    switch(action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
        }
        case GET_NAME_DOGS:
            return {
                ...state,
                dogs: action.payload
         }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs
            const temperamentFiltered = action.payload === 'Asc' ? allDogs : allDogs.filter(e => e.temperaments === action.payload)
            return {
                ...state,
                dogs: temperamentFiltered
        }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case POST_DOGS:
            return {
                ...state,
                // dogs: [...state.dogs, action.payload]
            }

        case FILTER_CREATED:
            const all = state.dogs
            const createdFilter = action.payload === 'All' ? all : action.payload === 'Created' ? all.filter(e => e.createInDb) : all.filter(e => !e.createInDb)
        return {
            ...state,
            dogs: createdFilter
        }
        // case FILTER_CREATED:
        //     const createdFilter = action.payload === 'created' ? allDogs.filter(e => e.createInDb) : allDogs.filter(e => !e.createInDb)
        // return {
        //     ...state,
        //     dogs: action.payload === 'All' ? state.allDogs : createdFilter
        // }

        case FILTER_BY_NAME:
            const ord = action.payload === 'Asc' ?              //
            state.dogs.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.dogs.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                dogs: ord
            }
            
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }

};


