import axios from 'axios';
import { GET_ERRORS, GET_CUSTOMER, ADD_CUSTOMER, DELETE_CUSTOMER, CUSTOMERS_LOADING } from '../types';

export const addCustomer = (customerData, history)=> dispatch => {
    axios.post('/api/customer/new', customerData)
    .then(res => history.push('/customerexistinglist')) 
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};



export const getCustomer =() => dispatch => {
    dispatch(setCustomersLoading());
    axios.get('/api/customer')
    .then(res => dispatch({
        type: GET_CUSTOMER,
        payload: res.data
    })
    );
};

export const addCustomer= (customer) => dispatch => {
    axios.post('/api/customer/new', customer)
    .then(res => dispatch({
        type: ADD_CUSTOMER,
        payload: res.data
    })
    );
};

export const deleteCustomer = id => dispatch => {
    axios.delete(`/api/customer/${id}`)
    .then(res => dispatch({
        type: DELETE_CUSTOMER,
        payload: id
    })
    );
};

export const setCustomersLoading = () => {
    return{
        type: CUSTOMERS_LOADING
    };
};