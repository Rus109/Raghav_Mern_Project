import {
  GET_CUSTOMER,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  CUSTOMER_LOADING
} from "../../actions/types";

const initialState = {
  customers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER:
      return {
        ...state,
        customers: action.payload,
        loading: false
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        )
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers]
      };
    case CUSTOMER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
