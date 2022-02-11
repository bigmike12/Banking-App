import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";

import AuthState from "./context/auth/AuthState";
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
        <Router>
          <>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/transactions" component={HomePage} />
                <PrivateRoute exact path="/transfer" component={BankingPage} />
                <Route exact path="/" component={SignUp} />
                <Route exact path="/login" component={LoginPage} />
              </Switch>
            </div>
          </>
        </Router>
    </AuthState>
    // <div>
    //   <BankingPage />
    // </div>
  );
};

export default App;
