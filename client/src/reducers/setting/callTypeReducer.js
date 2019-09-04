import {
  GET_ERRORS,
  GET_CALL_TYPE,
  ADD_CALL_TYPE,
  DELETE_CALL_TYPE,
  CALL_TYPE_LOADING
} from "../../actions/types";

const initialState = {
  calltype: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case GET_CALL_TYPE:
      return {
        ...state,
        calltype: action.payload,
        loading: false
      };

    case ADD_CALL_TYPE:
      return {
        ...state,
        calltype: [action.payload, ...state.calltype]
      };

    case DELETE_CALL_TYPE:
      return {
        ...state,
        calltype: state.calltype.filter(
          calltype => calltype._id !== action.payload
        )
      };

    case CALL_TYPE_LOADING:
      return {
        ...state,
        loading: false
      };

    default: {
      return state;
    }
  }
}
