import axios from 'axios';
import { GET_COMPANY, ADD_COMPANY, DELETE_COMPANY, COMPANY_LOADING} from '../types';

export const getCompany = () => dispatch => {
	dispatch(setCompanysLoading());
	axios.get('/api/companys')
	.then(res => dispatch({
		type: GET_COMPANY,
		payload: res.data
	})
	);
};

export const addCompany = (company) => dispatch => {
	axios.post('/api/companys/newcompany', company)
	.then(res => dispatch({
		type: ADD_COMPANY,
		payload: res.data
	})
	);
};


export const deleteCompany = id => dispatch => {
   axios.delete(`/api/companys/${id}`)
   .then(res => dispatch({
	   type: DELETE_COMPANY,
	   payload: id
      })
   );
};

export const setCompanysLoading = () => {
	return{
		type: COMPANY_LOADING
	};
};
