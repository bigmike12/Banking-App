import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";

import AuthState from "./context/auth/AuthState";
import TransactionState from "./context/transactions/TransactionState";
import setAuthToken from "./utils/setAuthToken";

import BankingPage from "pages/BankingPage/BankingPage";
import HomePage from "pages/HomePage/HomePage";
import LoginPage from "pages/LoginPage/LoginPage";
import SignUp from "pages/SignUp/SignUp.js";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  return (
    <AuthState>
      <TransactionState>
        <Router>
          <>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/transactions" component={HomePage} />
                <PrivateRoute exact path="/transfer" component={BankingPage} />
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/signup" component={SignUp} />
              </Switch>
            </div>
          </>
        </Router>
      </TransactionState>
    </AuthState>
  );
};

export default App;
