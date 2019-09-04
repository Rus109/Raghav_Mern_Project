import axios from "axios";
import {
  GET_SPECIALITY,
  GET_CURRENT_SPECIALITY,
  ADD_SPECIALITY,
  DELETE_SPECIALITY,
  SPECIALITY_LOADING
} from "../types";


export const getSpeciality = () => dispatch => {
  dispatch(setSpecialityLoading());
  axios.get("/api/speciality").then(res =>
    dispatch({
      type: GET_SPECIALITY,
      payload: res.data
    })
  );
};


export const getCurrentSpeciality = id => dispatch => {
  dispatch(setSpecialityLoading());
  axios
    .get(`/api/speciality/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_SPECIALITY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_SPECIALITY,
        payload: {}
      });
    });
};


export const addSpeciality = speciality => dispatch => {
  axios.post("/api/speciality/add", speciality).then(res =>
    dispatch({
      type: ADD_SPECIALITY,
      payload: res.data
    })
  );
};

export const deleteSpeciality = id => dispatch => {
  axios.delete(`/api/speciality/${id}`).then(res =>
    dispatch({
      type: DELETE_SPECIALITY,
      payload: id
    })
  );
};

export const setSpecialityLoading = () => {
  return {
    type: SPECIALITY_LOADING
  };
};
