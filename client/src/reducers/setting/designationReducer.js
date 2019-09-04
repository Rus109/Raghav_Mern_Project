import {
  GET_DESIGNATION,
  ADD_DESIGNATION,
  DELETE_DESIGNATION,
  DESIGNATION_LOADING
} from "../../actions/types";

const initialState = {
  designation: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DESIGNATION:
      return {
        ...state,
        designation: action.payload,
        loading: false
      };
    case DELETE_DESIGNATION:
      return {
        ...state,
        designation: state.designation.filter(
          designation => designation._id !== action.payload
        )
      };
    case ADD_DESIGNATION:
      return {
        ...state,
        designation: [action.payload, ...state.designation]
      };
    case DESIGNATION_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
