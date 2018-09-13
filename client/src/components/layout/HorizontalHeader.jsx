import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import rama from "../../assets/img/logo/payment/rama.png";

class HorizontalHeader extends Component {
  render() {
    const { user, profile, onLogoutClick } = this.props;

    const adminLinks = (
      <ul className="navigation-menu">
        <li className="has-submenu">
          <Link to="/">
            <i className="ti-home" />
            Dashboard
          </Link>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="ti-user" />
            Users
          </a>
          <ul className="submenu">
            <li>
              <Link to="/admin/users">All Users</Link>
            </li>
            <li>
              <Link to="/admin/add-user">Create User</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="ti-layers-alt" />
            Requests
          </a>
          <ul className="submenu">
            <li>
              <Link to="/admin/requests/all">All Requests</Link>
            </li>
            <li>
              <Link to="/admin/request/new">Create New Request</Link>
            </li>
            <li>
              <a href="/">Move RCC Tokens</a>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="ti-layers-alt" />
            Reports
          </a>
          <ul className="submenu">
            <li>
              <Link to="/reports/referrals">Referrals</Link>
            </li>
            <li>
              <Link to="/admin/reports/commission">Commission Report</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="dripicons-user" />
            Profile
          </a>
          <ul className="submenu">
            <li>
              <Link to="/edit-profile">View Profile</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="ti-settings" />
            Settings
          </a>
          <ul className="submenu">
            <li>
              <Link to="/admin/settings">All Settings</Link>
            </li>
            <li>
              <Link to="/admin/settings/account">
                Add Componey Account Address
              </Link>
            </li>
            <li>
              <Link to="/admin/settings/rounds">Add Investor Round.</Link>
            </li>
            <li>
              <Link to="/admin/settings/commission">Commissions</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <Link to="/admin/historylogs">
            <i className="ti-files" />
            History Logs
          </Link>
        </li>
      </ul>
    );
    const userLinks = (
      <ul className="navigation-menu">
        <li className="has-submenu">
          <Link to="/">
            <i className="ti-home" />
            Dashboard
          </Link>
        </li>
        <li className="has-submenu">
          <Link to="/request-token">
            <i className="ti-files" />
            Buy RCC Tokens
          </Link>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="dripicons-user" />
            Profile
          </a>
          <ul className="submenu">
            <li>
              <Link to="/edit-profile">View Profile</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="ti-files" />
            Reports
          </a>
          <ul className="submenu">
            <li>
              <Link to="/transaction/my-transactions">My Transactions</Link>
            </li>
            <li>
              <Link to="/reports/referrals">Referrals</Link>
            </li>
          </ul>
        </li>
      </ul>
    );

    const agentLinks = (
      <ul className="navigation-menu">
        <li className="has-submenu">
          <Link to="/">
            <i className="ti-home" />
            Dashboard
          </Link>
        </li>
        <li className="has-submenu" />
        <li className="has-submenu">
          <a href="#">
            <i className="ti-settings" />
            RCC Tokens
          </a>
          <ul className="submenu">
            <li>
              <Link to="/request-token">Buy RCC Tokens</Link>
            </li>
            <li>
              <Link to="/admin/settings">Sell RCC Tokens</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="dripicons-user" />
            Profile
          </a>
          <ul className="submenu">
            <li>
              <Link to="/edit-profile">View Profile</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#">
            <i className="ti-settings" />
            Reports
          </a>
          <ul className="submenu">
            <li>
              <Link to="/transaction/my-transactions">Transactions Report</Link>
            </li>
            <li>
              <Link to="/reports/referrals">Referrals</Link>
            </li>
          </ul>
        </li>
      </ul>
    );
    return (
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            {/* <!-- Logo container--> */}
            <div className="logo">
              {/* <!-- Text Logo --> */}
              {/* <!--<a href="index.html" className="logo">--> */}
              {/* <!--Upcube--> */}
              {/* <!--</a>--> */}
              {/* <!-- Image Logo --> */}
              <a href="index.html" className="logo">
                <img src={rama} alt="" height="22" className="logo-small" />
                <img src={rama} alt="" height="24" className="logo-large" />
              </a>
            </div>
            {/* <!-- End Logo container--> */}

            <div className="menu-extras topbar-custom">
              {/* <!-- Search input --> */}
              {/* <div className="search-wrap" id="search-wrap">
                <div className="search-bar">
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                  />
                  <a
                    href="#"
                    className="close-search toggle-search"
                    data-target="#search-wrap"
                  >
                    <i className="mdi mdi-close-circle" />
                  </a>
                </div>
              </div> */}

              <ul className="list-inline float-right mb-0">
                {/* <!-- Search --> */}
                {/* <li className="list-inline-item dropdown notification-list">
                  <a
                    className="nav-link waves-effect toggle-search"
                    href="#"
                    data-target="#search-wrap"
                  >
                    <i className="mdi mdi-magnify noti-icon" />
                  </a>
                </li> */}
                {/* <!-- notification--> */}
                {Object.keys(profile).length > 0 ? (
                  <li className="menu-item list-inline-item text-white">
                    Ballance : {profile.amount} $
                  </li>
                ) : (
                  <li className="menu-item list-inline-item text-white">
                    Ballance : 0 $
                  </li>
                )}

                <li className="list-inline-item dropdown notification-list">
                  <a
                    className="nav-link dropdown-toggle arrow-none waves-effect"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-bell-outline noti-icon" />
                    <span className="badge badge-danger noti-icon-badge">
                      3
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                    {/* <!-- item--> */}
                    <div className="dropdown-item noti-title">
                      <h5>Notification (3)</h5>
                    </div>

                    {/* <!-- item--> */}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item active"
                    >
                      <div className="notify-icon bg-success">
                        <i className="mdi mdi-cart-outline" />
                      </div>
                      <p className="notify-details">
                        <b>Your order is placed</b>
                        <small className="text-muted">
                          Dummy text of the printing and typesetting industry.
                        </small>
                      </p>
                    </a>

                    {/* <!-- All--> */}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
                      View All
                    </a>
                  </div>
                </li>
                {/* <!-- User--> */}
                <li className="list-inline-item dropdown notification-list">
                  <a
                    className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="rounded-circle"
                    />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                    <Link className="dropdown-item" to="/edit-profile">
                      <i className="dripicons-user text-muted" /> Profile
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/transaction/my-transactions"
                    >
                      <i className="dripicons-wallet text-muted" /> My Wallet
                    </Link>

                    <div className="dropdown-divider" />
                    <Link
                      to=""
                      className="dropdown-item"
                      onClick={onLogoutClick}
                    >
                      <i className="dripicons-exit text-muted" /> Logout
                    </Link>
                  </div>
                </li>
                <li className="menu-item list-inline-item">
                  {/* <!-- Mobile menu toggle--> */}
                  <a className="navbar-toggle nav-link">
                    <div className="lines">
                      <span />
                      <span />
                      <span />
                    </div>
                  </a>
                  {/* <!-- End mobile menu toggle--> */}
                </li>
              </ul>
            </div>
            {/* <!-- end menu-extras --> */}

            <div className="clearfix" />

            {/* </div> <!-- end container --> */}
          </div>
          {/* <!-- end topbar-main --> */}

          {/* <!-- MENU Start --> */}
          <div className="navbar-custom">
            <div className="container-fluid">
              <div id="navigation">
                {/* <!-- Navigation Menu--> */}
                {user.role === "admin"
                  ? adminLinks
                  : user.role === "agent"
                    ? agentLinks
                    : userLinks}

                {/* <!-- End navigation menu --> */}
              </div>
              {/* </div> <!-- end #navigation --> */}
            </div>
            {/* </div> <!-- end container --> */}
          </div>
          {/* </div> <!-- end navbar-custom --> */}
        </div>
      </header>
    );
  }
}

HorizontalHeader.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default HorizontalHeader;
