import {
  GET_PRODUCT_CATEGORY,
  ADD_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  PRODUCT_CATEGORY_LOADING
} from "../../actions/types";

const initialState = {
  speciality: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategory: action.payload,
        loading: false
      };
    case DELETE_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategory: state.productCategory.filter(
          productCategory => productCategory._id !== action.payload
        )
      };
    case ADD_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategory: [action.payload, ...state.productCategory]
      };
    case PRODUCT_CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
