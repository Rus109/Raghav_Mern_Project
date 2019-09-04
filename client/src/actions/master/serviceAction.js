import axios from 'axios';
import { GET_ERRORS, GET_SERVICE, ADD_SERVICE, DELETE_SERVICE, SERVICES_LOADING } from '../types';

export const addService = (serviceData, history) => dispatch => {
    axios.post('/api/service/new', serviceData)
    .then(res => history.push('/serviceexistinglist'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
    );
};

export const getService =() => dispatch => {
    dispatch(setServicesLoading());
    axios.get('/api/service')
    .then(res => dispatch({
        type: GET_SERVICE,
        payload: res.data
    })
    );
};

export const addService= (service) => dispatch => {
    axios.post('/api/service/new', service)
    .then(res => dispatch({
        type: ADD_SERVICE,
        payload: res.data
    })
    );
};

export const deleteService = id => dispatch => {
    axios.delete(`/api/service/${id}`)
    .then(res => dispatch({
        type: DELETE_SERVICE,
        payload: id
    })
    );
};

export const setServicesLoading = () => {
    return{
        type: SERVICES_LOADING
    };
};