import axios from 'axios';
import { 
  GET_ERRORS,
  GET_CUSTOMER_SUB_DEPARTMENT, 
  ADD_CUSTOMER_SUB_DEPARTMENT, 
  DELETE_CUSTOMER_SUB_DEPARTMENT,
  CUSTOMERS_SUB_DEPARTMENT_LOADING
   } from '../types';

export const addCustomerSubDepartment = (customersubdepartmentData, history) => dispatch => {
    axios.post('/api/customersubdepartment/new', customersubdepartmentData)
    .then(res => history.push('/customersubdepartmentexistinglist'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
} 

export const getCustomerSubDepartment =() => dispatch => {
    dispatch(setCustomersSubDepartmentLoading());
    axios.get('/api/customersubdepartment')
    .then(res => dispatch({
        type: GET_CUSTOMER_SUB_DEPARTMENT,
        payload: res.data
    })
    );
};

export const addCustomerSubDepartment= (customersubdepartment) => dispatch => {
    axios.post('/api/customersubdepartment/new', customersubdepartment)
    .then(res => dispatch({
        type: ADD_CUSTOMER_SUB_DEPARTMENT,
        payload: res.data
    })
    );
};

export const deleteCustomerSubDepartment = id => dispatch => {
    axios.delete(`/api/customersubdepartment/${id}`)
    .then(res => dispatch({
        type: DELETE_CUSTOMER_SUB_DEPARTMENT,
        payload: id
    })
    );
};

export const setCustomersSubDepartmentLoading = () => {
    return{
        type: CUSTOMERS_SUB_DEPARTMENT_LOADING
    };
};