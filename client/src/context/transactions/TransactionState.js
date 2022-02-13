import React, { useReducer } from 'react';
import axios from 'axios';
import TransactionContext from './TransactionContext';
import transactionReducer from './transactionReducer';
import {
	SEND_MONEY_SUCCESS,
	SEND_MONEY_FAIL,
	GET_TRANSACTIONS_SUCCESS,
	GET_TRANSACTIONS_FAIL,
	CLEAR_ERRORS,
} from '../types';

const TransactionState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		message: null,
		transactions: [],
	};

	const [state, dispatch] = useReducer(transactionReducer, initialState);

	//Send Money
	const sendMoney = async (formData, history) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/transfer', formData, config);
			console.log('send money', res);
			dispatch({
				type: SEND_MONEY_SUCCESS,
				payload: res.data,
			});

			history.push('/transactions');
		} catch (err) {
			dispatch({
				type: SEND_MONEY_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//Get transactions
	const getTransactions = async () => {
		try {
			const res = await axios.get('/api/transfer');
			dispatch({
				type: GET_TRANSACTIONS_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: GET_TRANSACTIONS_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<TransactionContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				transactions: state.transactions,
				message: state.message,
				clearErrors,
				sendMoney,
				getTransactions,
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	);
};

export default TransactionState;
