import React, { useContext } from 'react'
import AuthContext from '../context/auth/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isUserAuthenticated } = authContext;
    return (
        <Route
			{...rest}
			render={props =>
				isUserAuthenticated() ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
    );
};

export default PrivateRoute









