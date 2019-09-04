import axios from "axios";
import {
  GET_PRODUCT_CATEGORY,
  GET_CURRENT_PRODUCT_CATEGORY,
  ADD_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  PRODUCT_CATEGORY_LOADING
} from "../types";


export const getProductCategory = () => dispatch => {
  dispatch(setProductCategoryLoading());
  axios.get("/api/productcategory").then(res =>
    dispatch({
      type: GET_PRODUCT_CATEGORY,
      payload: res.data
    })
  );
};


export const getCurrentProductCategory = () => dispatch => {
  dispatch(setProductCategoryLoading());
  axios
    .get(`/api/productcategory/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_PRODUCT_CATEGORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_PRODUCT_CATEGORY,
        payload: {}
      });
    });
};


export const addProductCategory = productCategory => dispatch => {
  axios.post("/api/productcategory/add", productCategory).then(res =>
    dispatch({
      type: ADD_PRODUCT_CATEGORY,
      payload: res.data
    })
  );
};

export const deleteProductCategory = id => dispatch => {
  axios.delete(`/api/productcategory/${id}`).then(res =>
    dispatch({
      type: DELETE_PRODUCT_CATEGORY,
      payload: id
    })
  );
};

export const setProductCategoryLoading = () => {
  return {
    type: PRODUCT_CATEGORY_LOADING
  };
};
