import { GET_COMPANY, ADD_COMPANY, DELETE_COMPANY, COMPANY_LOADING} from '../../actions/types';

const initialState ={
	companys: [],
	loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY:
      return {
        ...state,
        companys: action.payload,
        loading: false
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companys: state.companys.filter(company => company._id !== action.payload)
      };
    case ADD_COMPANY:
      return {
        ...state,
        companys: [action.payload, ...state.companys]
      };
    case COMPANY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}