import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import BuyToken from "./components/create-profile/BuyToken";
import Document from "./components/create-profile/Document";
import AdminPrivateRoute from "./components/common/AdminPrivateRoute";
import Users from "./components/admin/Users";
import User from "./components/admin/userDetails/User";
import NotFound from "./components/not-found/NotFound";
import CreateProfile from "./components/create-profile/CreateProfile";
import TransactionList from "./components/transaction/TransactionList";
import Settings from "./components/admin/settings/Index";
import Confirmation from "./components/auth/Confirmation";
import SendConfirmation from "./components/auth/SendConfirmation";
import ResendConfirmation from "./components/auth/ResendConfirmation";
import Account from "./components/admin/settings/Account";
import Rounds from "./components/admin/settings/Rounds";
import EditAccount from "./components/admin/settings/edit-settings/EditAccount";
import EditRound from "./components/admin/settings/edit-settings/EditRound";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/confirmation/:id" component={Confirmation} />
            <Route exact path="/confirmation" component={SendConfirmation} />
            <Route
              exact
              path="/resendconfirmation"
              component={ResendConfirmation}
            />
            <div>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              {/* /admin/users */}

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/buy" component={BuyToken} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/document/:id" component={Document} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/transactions"
                  component={TransactionList}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/admin/transaction/:id"
                  component={Account}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/user/:user_id" component={User} />
              </Switch>
            </div>
            <div>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/users"
                  component={Users}
                />
              </Switch>

              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings"
                  component={Settings}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/account"
                  component={Account}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/edit-account/:id"
                  component={EditAccount}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/rounds"
                  component={Rounds}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/edit-round/:id"
                  component={EditRound}
                />
              </Switch>
            </div>
            <Route exact path="/not-found" component={NotFound} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
