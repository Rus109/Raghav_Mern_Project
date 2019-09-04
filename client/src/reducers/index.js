import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import companyReducer from "./master/companyReducer";
import productReducer from "./master/productReducer";
import serviceReducer from "./master/serviceReducer";
import customersubdepartmentReducer from "./master/customersubdepartmentReducer";
import customerReducer from "./master/customerReducer";
import customerTypeReducer from "./setting/customerTypeReducer";
import specialityReducer from "./setting/specialityReducer";
import designationReducer from "./setting/designationReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  //master Reducer
  company: companyReducer,
  product: productReducer,
  service: serviceReducer,
  customersubdepartment: customersubdepartmentReducer,
  customer: customerReducer,
  //settings Reducer
  customerType: customerTypeReducer,
  speciality: specialityReducer,
  designation: designationReducer
});
