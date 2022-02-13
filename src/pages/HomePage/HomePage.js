import Layout from '../../components/Layout/Layout';
import React, { useContext, useEffect, useState } from 'react';
import './HomePage.scss';
import Table from 'components/Table/Table';
import AuthContext from 'context/auth/AuthContext';
import { Link } from 'react-router-dom';
import TransactionContext from 'context/transactions/TransactionContext';
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
	const authContext = useContext(AuthContext);
	const { loadUser, user } = authContext;
	const transactionContext = useContext(TransactionContext);
	const { getTransactions, error, message, clearErrors, transactions } =
		transactionContext;

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
		if (transactions.length < 1) {
			getTransactions();
		}
		//eslint-disable-next-line
	}, [transactions]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearErrors();
		}
		//eslint-disable-next-line
	}, [error]);

	const [balUsd, setBalUsd] = useState(0);
	const [balEur, setBalEur] = useState(0);
	const [balGbp, setBalGbp] = useState(0);

	const totalBalUSD = `USD ${balUsd}`;
	const totalBalEUR = `EUR ${balEur}`;
	const totalBalGBP = `GBP ${balGbp}`;

	useEffect(() => {
		if (user) {
			setBalUsd(user.usdBalance);
			setBalEur(user.eurBalance);
			setBalGbp(user.gbpBalance);
		}
		//eslint-disable-next-line
	}, [balUsd, balEur, balGbp, user]);

	return (
		<>
			<Toaster />
			<Layout>
				<div className='top-container'>
					<div className='top-container-money'>
						<p className='top-container__balance'>Current Balance</p>
						<div>
							<h1 className='top-container__amount'>{totalBalUSD}</h1>
							<h1 className='top-container__amount'>{totalBalEUR}</h1>
							<h1 className='top-container__amount'>{totalBalGBP}</h1>
						</div>
					</div>

					<div className='top-container__button'>
						<Link to='/transfer'>
							<button>Send Money</button>
						</Link>
					</div>
				</div>
				{transactions.length > 0 ? (
					<Table data={transactions} />
				) : (
					<p>No transactions</p>
				)}
			</Layout>
		</>
	);
};

export default HomePage;
