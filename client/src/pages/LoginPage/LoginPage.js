import AuthContext from 'context/auth/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.scss';

const LoginPage = props => {
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const { login, message, clearErrors } = authContext;
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const onChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
  };
  
  useEffect(() => {
		if (message) {
			toast.success(message);
			clearErrors();
		}
		//eslint-disable-next-line
	}, [message]);

	const { email, password } = user;

	const onSubmit = e => {
		e.preventDefault();

		if (email === '' || password === '') {
			return toast.error('All fields are required');
		} else if (password.length < 6) {
			return toast.error('Password must be above six characters');
		} else {
			login({
				email,
        password,
			}, history);
			props.history.push('/transactions');
		}
	};

	return (
		<div className='login'>
			<Toaster />
			<h1 className='login-title'>Welcome Back</h1>

			<div className='login-footer'>
				<p>
					New to Banking? <Link to='/signup'>Sign up</Link>
				</p>
			</div>

			<form className='login-form' onSubmit={onSubmit}>
				<div className='login-email'>
					<input
						name='email'
						onChange={onChange}
						type='email'
						placeholder='Your Email Address'
					/>
				</div>
				<div className='login-password'>
					<input
						name='password'
						onChange={onChange}
						type='password'
						placeholder='Your Password'
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
