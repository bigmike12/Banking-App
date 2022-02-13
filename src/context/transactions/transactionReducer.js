import {
	SEND_MONEY_SUCCESS,
	SEND_MONEY_FAIL,
	GET_TRANSACTIONS_SUCCESS,
	GET_TRANSACTIONS_FAIL,
	CLEAR_ERRORS,
} from '../types';

const transactionReducer = (state, action) => {
	switch (action.type) {
		case SEND_MONEY_SUCCESS:
			return {
				...state,
				message: action.payload.msg,
				transactions: [action.payload.newTransaction, ...state.transactions],
			};
		case SEND_MONEY_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_TRANSACTIONS_SUCCESS:
			return {
				...state,
				transactions: action.payload,
				message: action.payload.msg,
			};
		case GET_TRANSACTIONS_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
				message: null,
			};
		default:
			return state;
	}
};

export default transactionReducer;
