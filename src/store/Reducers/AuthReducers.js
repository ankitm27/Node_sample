import { handleActions } from "redux-actions";

const INITIAL_STATE = {
    success:false,
    userType:"",
    getUsers:"",
    msg:""
};

const AuthReducers = handleActions({
    LOGIN:(state,action) => {
        return { ...state,...action.payload}
    },
    FORGET_PASSWORD:(state,action) => {
        return { ...state,...action.payload}
    },
    OTP_VERIFY:(state,action) => {
        return { ...state,...action.payload}
    },
    SIGN_UP:(state,action) => {
        return { ...state,...action.payload}
    },
    GET_USERS:(state,action) => {
        return { ...state,...action.payload}
    },
    DELETE_USER:(state,action) => {
        return { ...state,...action.payload}
    }
},INITIAL_STATE);

export default AuthReducers;

