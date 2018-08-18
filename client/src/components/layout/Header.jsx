import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser, getUsers } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import Navigation from "../admin/Navigation";
import rama from "../../assets/img/logo/payment/rama.png";

class Header extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    user.role === "admin" ? this.props.getUsers() : null;
  }
  onLogoutClick(e) {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const adminDropdown = (
      <li>
        <a href="javascript:;">
          <i className="sidebar-item-icon ti-home" />
          <span className="nav-label">Admin</span>
          <i className="fa fa-angle-left arrow" />
        </a>
        <ul className="nav-2-level collapse">
          <li>
            <a href="index.html">Users</a>
          </li>
        </ul>
      </li>
    );

    const adminlinks = (
      <li className="dropdown mega-menu">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
          Admin Dashboard
        </a>
        <div className="dropdown-menu">
          <div className="dropdown-arrow" />
          <div className="mega-toolbar-menu">
            <Navigation users={users} />
          </div>
        </div>
      </li>
    );

    return (
      <div>
        <header className="header" style={{ backgroundColor: "#34495f" }}>
          {/* <!-- START TOP-LEFT TOOLBAR--> */}
          <ul className="nav navbar-toolbar">
            <li>
              <a
                className="nav-link sidebar-toggler js-sidebar-toggler"
                href="javascript:;"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </a>
            </li>
            <li className="dropdown mega-menu">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
              >
                Menu
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-arrow" />
                <div className="mega-toolbar-menu">
                  <div className="d-flex">
                    <a className="mega-toolbar-item" href={`/user/${user.id}`}>
                      <div className="item-icon">
                        <i className="fa fa-user-circle" />
                      </div>
                      <div className="item-name">Profile</div>
                      <div className="item-text">View Profile</div>
                      <div className="item-details">VIEW, EDIT Profile</div>
                    </a>
                    <a className="mega-toolbar-item" href="/buy">
                      <div className="item-icon">
                        <i className="fa fa-bitcoin" />
                      </div>
                      <div className="item-name">Buy Tokens</div>
                      <div className="item-text">View Profile</div>
                      <div className="item-details">Buy</div>
                    </a>
                  </div>
                  <div className="d-flex">
                    <Link className="mega-toolbar-item" to="/transactions">
                      <div className="item-icon">
                        <i className="fa fa-user-circle" />
                      </div>
                      <div className="item-name">Transactions</div>
                      <div className="item-text">View Transactions</div>
                      <div className="item-details">Approved & Pending</div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            {user.role === "admin" ? adminlinks : null}
          </ul>
          {/* <!-- END TOP-LEFT TOOLBAR--> */}
          {/* <!--LOGO--> */}
          <a
            className="page-brand"
            href="/"
            style={{
              height: "auto",
              width: "20rem",
              backgroundColor: "transparent",
              borderRadius: "3%"
            }}
          >
            <img src={rama} alt="Rama Logo" />
          </a>

          {/* <!-- START TOP-RIGHT TOOLBAR--> */}

          <ul className="nav navbar-toolbar">
            <span
              class="text-white pb-1 d-inline-block mr-4"
              style={{ borderBottom: "2px solid" }}
            >
              RCC Balance: 1230.00 RCC
            </span>
            <li className="dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle link"
                data-toggle="dropdown"
              >
                <div className="admin-avatar">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <span>{user.name}</span>
              </a>
              <div className="dropdown-menu dropdown-arrow dropdown-menu-right admin-dropdown-menu">
                <div className="dropdown-arrow" />
                <div
                  className="dropdown-header"
                  style={{ backgroundColor: "#34495f" }}
                >
                  <div className="admin-avatar">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <div>
                    <h5 className="font-strong text-white">{user.name}</h5>
                  </div>
                </div>
                <div className="admin-menu-features">
                  <Link className="admin-features-item" to={`/user/${user.id}`}>
                    <i className="ti-user" />
                    <span>PROFILE</span>
                  </Link>
                  <Link className="admin-features-item" to={`/user/${user.id}`}>
                    <i className="ti-wallet h1 text-light" />
                    <span className="h1 text-success">
                      <sup>$ 0</sup>
                    </span>
                  </Link>
                </div>
                <div className="admin-menu-content">
                  <div className="d-flex justify-content-between mt-2">
                    <a className="text-muted" href="#">
                      Earnings history
                    </a>
                    <Link
                      to=""
                      className="d-flex align-items-center"
                      onClick={this.onLogoutClick.bind(this)}
                    >
                      Logout
                      <i className="ti-shift-right ml-2 font-20" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {/* <!-- END TOP-RIGHT TOOLBAR--> */}
        </header>
        <nav className="page-sidebar">
          <ul className="side-menu metismenu scroller">
            <li className="heading">
              <Link to="/">
                <i className="sidebar-item-icon ti-home" />
                <span className="nav-label">Dashboards</span>
              </Link>
            </li>
            <li className="heading">
              <Link to="/buy">
                <i className="sidebar-item-icon fa fa-bitcoin" />
                <span className="nav-label">Buy Tokens</span>
              </Link>
            </li>
            <li className="heading">
              <Link to="/">
                <i className="sidebar-item-icon fa fa-exchange" />
                <span className="nav-label">Transactions</span>
              </Link>
            </li>
            {/* Admin */}
            {user.role === "admin" ? adminDropdown : null}
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  getUsers: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { clearCurrentProfile, logoutUser, getUsers }
)(Header);
