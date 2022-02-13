import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL
 } from '../types'

 const authReducer = (state, action) => {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
                message: 'User logged in'
            }
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: action.payload.message
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                users: action.payload,
                loading: false,
            }
        case GET_USERS_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: null,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                message: null
            }
        default:
            return state;
    }
 }

 export default authReducer;







