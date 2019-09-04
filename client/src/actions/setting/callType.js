import axios from "axios";
import {
  GET_CALL_TYPE,
  GET_CURRENT_CALL_TYPE,
  ADD_CALL_TYPE,
  DELETE_CALL_TYPE,
  CALL_TYPE_LOADING,
  GET_ERRORS
} from "../types";


export const getCallType = () => dispatch => {
  dispatch(setCallTypeLoading());
  axios.get("/api/calltype").then(res =>
    dispatch({
      type: GET_CALL_TYPE,
      payload: res.data
    })
  );
};


export const getCurrentCallType = () => dispatch => {
  dispatch(setCallTypeLoading());
  axios
    .get(`/api/calltype/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_CALL_TYPE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CURRENT_CALL_TYPE,
        payload: {}
      });
    });
};


export const addCallType = callType => dispatch => {
  axios.post("/api/calltype/add", callType).then(res =>
    dispatch({
      type: ADD_CALL_TYPE,
      payload: res.data
    })
  );
};

//Deleting the item through DELETE router by using their ID
export const deleteCallType = id => dispatch => {
  axios.delete(`/api/calltype/${id}`).then(res =>
    dispatch({
      type: DELETE_CALL_TYPE,
      payload: id
    })
  );
};

export const setCallTypeLoading = () => {
  return {
    type: CALL_TYPE_LOADING
  };
};
