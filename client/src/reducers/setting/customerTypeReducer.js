import {
  GET_ERRORS,
  GET_CUSTOMER_TYPE,
  ADD_CUSTOMER_TYPE,
  DELETE_CUSTOMER_TYPE,
  CUSTOMER_TYPE_LOADING
} from "../../actions/types";

const initialState = {
  customerTypes: [],
  loading: false
};

export default function(state = initialState, action){
  switch(action.type){
    case GET_ERRORS:
    return action.payload;

    case GET_CUSTOMER_TYPE: 
    return {
      ...state,
      customerstype: action.payload,
      loading: false
    };

    case DELETE_CUSTOMER_TYPE:
    return {
      ...state,
      customerstype: state.customerstype.filter(
        customertype => customertype._id !== action.payload
      )
    };

    case ADD_CUSTOMER_TYPE:
    return {
      ...state,
      customerstype: [action.payload, ...state.customerstype]
    };

  case CUSTOMER_TYPE_LOADING:
    return {
      ...state,
      loading: true
    };
    default: 
    return state;
  }
}
