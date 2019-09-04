import axios from "axios";
import {
  GET_PRODUCT_SUB_CATEGORY,
  GET_CURRENT_PRODUCT_SUB_CATEGORY,
  ADD_PRODUCT_SUB_CATEGORY,
  DELETE_PRODUCT_SUB_CATEGORY,
  PRODUCT_SUB_CATEGORY_LOADING
} from "../types";


export const getProductSubCategory = () => dispatch => {
  dispatch(setProductSubCategoryLoading());
  axios.get("/api/productsubcategory").then(res =>
    dispatch({
      type: GET_PRODUCT_SUB_CATEGORY,
      payload: res.data
    })
  );
};


export const getCurrentProductSubCategory = () => dispatch => {
  dispatch(setProductSubCategoryLoading());
  axios
    .get(`/api/productsubcategory/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_PRODUCT_SUB_CATEGORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_PRODUCT_SUB_CATEGORY,
        payload: {}
      });
    });
};


export const addProductSubCategory = productSubCategory => dispatch => {
  axios.post("/api/productsubcategory/add", productSubCategory).then(res =>
    dispatch({
      type: ADD_PRODUCT_SUB_CATEGORY,
      payload: res.data
    })
  );
};

export const deleteProductSubCategory = id => dispatch => {
  axios.delete(`/api/productsubcategory/${id}`).then(res =>
    dispatch({
      type: DELETE_PRODUCT_SUB_CATEGORY,
      payload: id
    })
  );
};

export const setProductSubCategoryLoading = () => {
  return {
    type: PRODUCT_SUB_CATEGORY_LOADING
  };
};
