import {
  GET_SERVICE,
  ADD_SERVICE,
  DELETE_SERVICE, 
  SERVICE_LOADING 
} from '../../actions/types';

const initialState ={
	services: [],
	loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICE:
      return {
        ...state,
        services: action.payload,
        loading: false
      };
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(service => service._id !== action.payload)
      };
    case ADD_SERVICE:
      return {
        ...state,
        services: [action.payload, ...state.services]
      };
    case SERVICE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}