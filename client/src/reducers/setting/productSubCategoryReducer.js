import {
  GET_PRODUCT_SUB_CATEGORY,
  ADD_PRODUCT_SUB_CATEGORY,
  DELETE_PRODUCT_SUB_CATEGORY,
  PRODUCT_SUB_CATEGORY_LOADING
} from "../../actions/types";

const initialState = {
  speciality: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_SUB_CATEGORY:
      return {
        ...state,
        productSubCategory: action.payload,
        loading: false
      };
    case DELETE_PRODUCT_SUB_CATEGORY:
      return {
        ...state,
        productSubCategory: state.productSubCategory.filter(
          productSubCategory => productSubCategory._id !== action.payload
        )
      };
    case ADD_PRODUCT_SUB_CATEGORY:
      return {
        ...state,
        productSubCategory: [action.payload, ...state.productSubCategory]
      };
    case PRODUCT_SUB_CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
