import axios from "axios";
import {
  GET_SERVICE_PROVIDER,
  GET_CURRENT_SERVICE_PROVIDER,
  ADD_SERVICE_PROVIDER,
  DELETE_SERVICE_PROVIDER,
  SERVICE_PROVIDER_LOADING
} from "../types";


export const getServiceProvider = () => dispatch => {
  dispatch(setServiceProviderLoading());
  axios.get("/api/serviceprovider").then(res =>
    dispatch({
      type: GET_SERVICE_PROVIDER,
      payload: res.data
    })
  );
};


export const getCurrentServiceProvider = () => dispatch => {
  dispatch(setServiceProviderLoading());
  axios
    .get(`/api/serviceprovider/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_SERVICE_PROVIDER,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_SERVICE_PROVIDER,
        payload: {}
      });
    });
};


export const addServiceProvider = serviceProvider => dispatch => {
  axios.post("/api/serviceprovider/add", serviceProvider).then(res =>
    dispatch({
      type: ADD_SERVICE_PROVIDER,
      payload: res.data
    })
  );
};

export const deleteServiceProvider  = id => dispatch => {
  axios.delete(`/api/serviceprovider/${id}`).then(res =>
    dispatch({
      type: DELETE_SERVICE_PROVIDER,
      payload: id
    })
  );
};

export const setServiceProviderLoading = () => {
  return {
    type: SERVICE_PROVIDER_LOADING
  };
};
