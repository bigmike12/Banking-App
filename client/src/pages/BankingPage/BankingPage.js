import Layout from '../../components/Layout/Layout';
import React, { useState, useContext, useEffect } from 'react';
import './BankingPage.scss';
import AuthContext from 'context/auth/AuthContext';
import TransactionContext from 'context/transactions/TransactionContext';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BankingPage = () => {
	const authContext = useContext(AuthContext);
	const transactionContext = useContext(TransactionContext);
	const { loadUser, user, getUsers, users } = authContext;
	const { sendMoney, error, message, clearErrors } = transactionContext;
	const history = useHistory();

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (message) {
			toast.success(message);
			clearErrors();
		}
		//eslint-disable-next-line
	}, [message]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearErrors();
		}
		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		if (users === null) {
			getUsers();
		}
		//eslint-disable-next-line
	}, [users]);

	const [transfer, setTransfer] = useState({
		sendTo: '',
		amount: '',
		senderCurrency: 'USD',
		recipientCurrency: 'USD',
	});

	const { sendTo, amount, senderCurrency, recipientCurrency } = transfer;

	const onChange = e => {
		setTransfer({
			...transfer,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		if (user._id === transfer.sendTo) {
			return toast.error("You can't send money to yourself");
		}
		if (transfer.sendTo === '' && transfer.amount === '') {
			return toast.error('All fields are required');
		}
		sendMoney(transfer, history);
	};

	return (
		<>
			<Toaster />
			<Layout>
				<p>How much would you like to transfer?</p>
				<button
					onClick={() => history.push('/transactions')}
					className='transactionsBtn'
				>
					View all transactions
				</button>

				<form onSubmit={onSubmit}>
					<div className='transfer-container'>
						<div>
							<select
								name='sendTo'
								className='recipientEmail'
								onChange={onChange}
								value={sendTo}
							>
								<option>Choose User</option>
								{users &&
									users.map(u => (
										<option key={u._id} value={u._id}>
											{u.email}
										</option>
									))}
							</select>
						</div>

						<div className='transfer'>
							<input
								name='amount'
								className='sendingAmount'
								type='number'
								placeholder='You Send'
								onChange={onChange}
							/>
							<select
								name='senderCurrency'
								className='transferOptions'
								onChange={onChange}
								value={senderCurrency}
							>
								<option value='USD'>USD</option>
								<option value='EUR'>EUR</option>
								<option value='GBP'>GBP</option>
							</select>
						</div>

						<div className='transfer'>
							<label>Recipient Gets</label>
							<select
								name='recipientCurrency'
								className='transferOptions'
								onChange={onChange}
								value={recipientCurrency}
							>
								<option value='USD'>USD</option>
								<option value='EUR'>EUR</option>
								<option value='GBP'>GBP</option>
							</select>
						</div>

						<button type='submit' className='submitButton'>
							Send
						</button>
					</div>
				</form>
			</Layout>
		</>
	);
};

export default BankingPage;
