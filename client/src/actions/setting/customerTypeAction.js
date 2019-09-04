import axios from "axios";
import {
  GET_CUSTOMER_TYPE,
  GET_CURRENT_CUSTOMER_TYPE,
  ADD_CUSTOMER_TYPE,
  DELETE_CUSTOMER_TYPE,
  CUSTOMER_TYPE_LOADING
} from "../types";


export const getCustomerType = () => dispatch => {
  dispatch(setCustomerTypeLoading());
  axios.get("/api/customertype").then(res =>
    dispatch({
      type: GET_CUSTOMER_TYPE,
      payload: res.data
    })
  );
};


export const getCurrentCustomerType = () => dispatch => {
  dispatch(setCustomerTypeLoading());
  axios
    .get(`/api/customertype/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_CUSTOMER_TYPE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_CUSTOMER_TYPE,
        payload: {}
      });
    });
};


export const addCustomerType = customerType => dispatch => {
  axios.post("/api/customertype/add", customerType).then(res =>
    dispatch({
      type: ADD_CUSTOMER_TYPE,
      payload: res.data
    })
  );
};

export const deleteCustomerType = id => dispatch => {
  axios.delete(`/api/customertype/${id}`).then(res =>
    dispatch({
      type: DELETE_CUSTOMER_TYPE,
      payload: id
    })
  );
};

export const setCustomerTypeLoading = () => {
  return {
    type: CUSTOMER_TYPE_LOADING
  };
};
