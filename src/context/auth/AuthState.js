import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
    users: null,
    message: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load User
	const loadUser = async () => {
		//@todo -- Load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get('/api/auth');
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Get users
	const getUsers = async () => {
		try {
			const res = await axios.get('/api/users');
			dispatch({
				type: GET_USERS_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: GET_USERS_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	const isUserAuthenticated = () => {
		if (localStorage.getItem('token')) {
			setAuthToken(localStorage.getItem('token'));
			return true;
		}

		return false;
	};

	//Register User
	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);
			console.log(res);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			//loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//Login User
	const login = async (formData, history) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth', formData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			await loadUser();
			history.push('/transactions');
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//Logout User
	const logout = () => dispatch({ type: LOGOUT });

	//Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
        users: state.users,
        message: state.message,
				register,
				clearErrors,
				loadUser,
				login,
				logout,
				getUsers,
				isUserAuthenticated,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
