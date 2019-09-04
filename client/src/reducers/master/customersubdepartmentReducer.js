import { 
  GET_CUSTOMER_SUB_DEPARTMENT, 
  ADD_CUSTOMER_SUB_DEPARTMENT, 
  DELETE_CUSTOMER_SUB_DEPARTMENT,
  CUSTOMER_SUB_DEPARTMENT_LOADING
} from '../../actions/types';

const initialState ={
	customerssubdepartment: [],
	loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_SUB_DEPARTMENT:
      return {
        ...state,
        customerssubdepartment: action.payload,
        loading: false
      };
    case DELETE_CUSTOMER_SUB_DEPARTMENT:
      return {
        ...state,
        customerssubdepartment: state.customerssubdepartment.filter(customerssubdepartment => customerssubdepartment._id !== action.payload)
      };
    case ADD_CUSTOMER_SUB_DEPARTMENT:
      return {
        ...state,
        customerssubdepartment: [action.payload, ...state.customerssubdepartment]
      };
    case CUSTOMER_SUB_DEPARTMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}