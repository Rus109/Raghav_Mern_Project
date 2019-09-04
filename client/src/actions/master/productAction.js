import axios from 'axios';
import { GET_ERRORS, GET_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING } from '../types';

export const addProduct = (productData, history) => dispatch => {
    axios.post('/api/product/new', productData)
    .then(res => history.push('/productexistinglist'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
    );
};

export const getProduct =() => dispatch => {
    dispatch(setProductsLoading());
    axios.get('/api/product')
    .then(res => dispatch({
        type: GET_PRODUCT,
        payload: res.data
    })
    );
};

export const addProduct= (product) => dispatch => {
    axios.post('/api/product/new', product)
    .then(res => dispatch({
        type: ADD_PRODUCT,
        payload: res.data
    })
    );
};

export const getProductById = (id) => dispatch => {
    axios.get(`/api/product/${id}`)
    .then( res => dispatch({
        type: GET_PRODUCT,
        payload: id
    }))
}

export const deleteProduct = id => dispatch => {
    axios.delete(`/api/product/${id}`)
    .then(res => dispatch({
        type: DELETE_PRODUCT,
        payload: id
    })
    );
};

export const setProductsLoading = () => {
    return{
        type: PRODUCTS_LOADING
    };
};