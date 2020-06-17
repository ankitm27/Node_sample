import { combineReducers } from "redux";
import AuthReducer from "./AuthReducers.js";
import ReportReducer from './ReportReducers.js';
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
    auth: AuthReducer,
    list:ReportReducer,
    form: formReducer
});