import {
    createAction
} from "redux-actions";
import axios from 'axios';
import {
    BACKEND_URL
} from './../../config.js';

const LOGIN = createAction("LOGIN");
const FORGET_PASSWORD = createAction("FORGET_PASSWORD");
const OTP_VERIFY = createAction("OTP_VERIFY");
const SIGN_UP = createAction('SIGN_UP');
const GET_USERS = createAction('GET_USERS');
const DELETE_USER = createAction("DELETE_USER");

export const login = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/auth/login", {
            "email": values.email,
            "password": values.password
        }
    ).then((res) => {
        if (res.data.success) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("userType",res.data.data.userType);
            dispatch(LOGIN({
                success: true,
                userType: res.data.data.userType
            }));
        } else {
            dispatch(LOGIN(res.data));
        }
    }).catch((err) => {
        dispatch(LOGIN({
            success: false,
            msg: "There is some problem, Please try after some time"
        }));
    })
};

export const forgetPassword = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/auth/forgetPassword", {
            "email": values.email
        }
    ).then((res) => {
        if (res.data.success) {
            dispatch(FORGET_PASSWORD({
                success: true
            }));
        } else {
            dispatch(FORGET_PASSWORD(res.data));
        }
    }).catch((err) => {
        dispatch(LOGIN({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const optVerify = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/auth/changePassword/OTP", {
            "OTP": values.OTP,
            "newPassword": values.newPassword,
            "newConfirmPassword": values.newConfirmPassword,
            "email": values.email
        }
    ).then((res) => {
        if (res.data.success) {
            dispatch(OTP_VERIFY({
                success: true
            }))
        } else {
            dispatch(OTP_VERIFY(res.data))
        }
    }).catch((err) => {
        dispatch(OTP_VERIFY({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}

export const signUp = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/auth/signup", {
            "email": values.userName,
            "password": values.password,
            "confirmPassword": values.confirmPassword
        }, {
            herders: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        console.log("res",res);
        dispatch(SIGN_UP(res.data));
    }).catch((err) => {
        dispatch(SIGN_UP({
            success: false,
            msg: "There is some problem, Please try after some time"
        }))
    })
}


export const getUsers = values => dispatch => {
    return axios.get(
        BACKEND_URL + "/v1/admin/auth/getUsers", {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(GET_USERS(res.data.data));
    }).catch((err) => {
        dispatch(GET_USERS({
            success: false,
            msg: "There is some problme, Please try after some time"
        }))
    })
}

export const deleteUser = values => dispatch => {
    return axios.post(
        BACKEND_URL + "/v1/admin/auth/deleteUser", {
            userId: values.userId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    ).then((res) => {
        dispatch(DELETE_USER(res.data.data));
    }).catch((err) => {
        dispatch(DELETE_USER({
            success:false,
            msg:"There is some problem, Please try after some time"
        }));
    })
}
