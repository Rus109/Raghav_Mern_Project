import axios from "axios";
import {
  GET_DESIGNATION,
  GET_CURRENT_DESIGNATION,
  ADD_DESIGNATION,
  DELETE_DESIGNATION,
  DESIGNATION_LOADING
} from "../types";


export const getDesignation = () => dispatch => {
  dispatch(setDesignationLoading());
  axios.get("/api/designation").then(res =>
    dispatch({
      type: GET_DESIGNATION,
      payload: res.data
    })
  );
};


export const getCurrentDesignation = () => dispatch => {
  dispatch(setDesignationLoading());
  axios
    .get(`/api/designation/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_DESIGNATION,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_DESIGNATION,
        payload: {}
      });
    });
};


export const addDesignation = designation => dispatch => {
  axios.post("/api/designation/add", designation).then(res =>
    dispatch({
      type: ADD_DESIGNATION,
      payload: res.data
    })
  );
};

export const deleteDesignation = id => dispatch => {
  axios.delete(`/api/designation/${id}`).then(res =>
    dispatch({
      type: DELETE_DESIGNATION,
      payload: id
    })
  );
};

export const setDesignationLoading = () => {
  return {
    type: DESIGNATION_LOADING
  };
};
