import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import AdminPrivateRoute from "./components/common/AdminPrivateRoute";

import Login from "./components/authentication/Login";

import "./App.css";
import Register from "./components/authentication/Register";
import Confirm from "./components/authentication/Confirm";
import ResendConfirm from "./components/authentication/ResendConfirm";
import Dashboard from "./components/dashboard";

import CreateUser from "./components/admin/users/CreateUser";
import AdminCreateProfile from "./components/admin/users/AdminCreateProfile";
import Users from "./components/admin/users/Users";
import EditUser from "./components/admin/users/edit-user/EditUser";

import Settings from "./components/admin/setting/Index";
import AccountAddress from "./components/admin/setting/AccountAddress";
import PhaseVolume from "./components/admin/setting/PhaseVolume";
import EditAccountAddress from "./components/admin/setting/edit-settings/EditAccountAddress";
import EditPhaseVolume from "./components/admin/setting/edit-settings/EditPhaseVolume";
import RequestToken from "./components/admin/request/RequestToken";
import AdminDashboard from "./components/admin/dashboard";
import AgentDashboard from "./components/agent/dashboard";
import UserDashboard from "./components/user/dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import BuyToken from "./components/user/request/BuyToken";
import EditProfile from "./components/edit-profile/EditProfile";
import InfoDocument from "./components/user/request/InfoDocument";
import TransactionHistory from "./components/transactionHistory/TransactionHistory";
import MyReferrals from "./components/referrals/Index";
import AdminRequestList from "./components/admin/request/RequestList";
import HistoryLogs from "./components/admin/history/HistoryLogs";
import Commission from "./components/admin/report/Commission";

class App extends Component {
  render() {
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
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/confirm/:id" component={Confirm} />
            <Route exact path="/resendconfirmation" component={ResendConfirm} />
            <div>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/user/dashboard"
                  component={UserDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/agent/dashboard"
                  component={AgentDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/admin/dashboard"
                  component={AdminDashboard}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/request-token"
                  component={BuyToken}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/document/:id"
                  component={InfoDocument}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/transaction/my-transactions"
                  component={TransactionHistory}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/reports/referrals"
                  component={MyReferrals}
                />
              </Switch>
            </div>
            <div>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/add-user"
                  component={CreateUser}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/user/:id"
                  component={EditUser}
                />
              </Switch>

              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/user/profile/:id"
                  component={AdminCreateProfile}
                />
              </Switch>

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
                  component={AccountAddress}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/edit-account/:id"
                  component={EditAccountAddress}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/rounds"
                  component={PhaseVolume}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/settings/edit-round/:id"
                  component={EditPhaseVolume}
                />
              </Switch>

              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/request/new"
                  component={RequestToken}
                />
              </Switch>
              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/requests/all"
                  component={AdminRequestList}
                />
              </Switch>

              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/historylogs"
                  component={HistoryLogs}
                />
              </Switch>

              <Switch>
                <AdminPrivateRoute
                  exact
                  path="/admin/reports/commission"
                  component={Commission}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
