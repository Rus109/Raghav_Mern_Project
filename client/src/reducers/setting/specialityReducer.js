import {
  GET_SPECIALITY,
  ADD_SPECIALITY,
  DELETE_SPECIALITY,
  SPECIALITY_LOADING
} from "../../actions/types";

const initialState = {
  speciality: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPECIALITY:
      return {
        ...state,
        speciality: action.payload,
        loading: false
      };
    case DELETE_SPECIALITY:
      return {
        ...state,
        speciality: state.speciality.filter(
          speciality => speciality._id !== action.payload
        )
      };
    case ADD_SPECIALITY:
      return {
        ...state,
        speciality: [action.payload, ...state.speciality]
      };
    case SPECIALITY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
