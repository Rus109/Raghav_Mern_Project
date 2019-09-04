import {
  GET_SERVICE_PROVIDER,
  ADD_SERVICE_PROVIDER,
  DELETE_SERVICE_PROVIDER,
  SERVICE_PROVIDER_LOADING
} from "../../actions/types";

const initialState = {
  speciality: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICE_PROVIDER:
      return {
        ...state,
        serviceProvider: action.payload,
        loading: false
      };
    case DELETE_SERVICE_PROVIDER:
      return {
        ...state,
        serviceProvider: state.serviceProvider.filter(
          serviceProvider => serviceProvider._id !== action.payload
        )
      };
    case ADD_SERVICE_PROVIDER:
      return {
        ...state,
        serviceProvider: [action.payload, ...state.serviceProvider]
      };
    case SERVICE_PROVIDER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
