import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../actions/profileActions";
import HorizontalHeader from "./HorizontalHeader";

class Header extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onLogoutClick(e) {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dContent;

    if (profile === null || loading) {
      dContent = (
        <div id="preloader">
          <div id="status">
            <div className="spinner" />
          </div>
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dContent = (
          <HorizontalHeader
            user={user}
            profile={profile}
            onLogoutClick={this.onLogoutClick.bind(this)}
          />
        );
      } else {
        dContent = (
          <HorizontalHeader
            user={user}
            profile={profile}
            onLogoutClick={this.onLogoutClick.bind(this)}
          />
        );
      }
    }

    return dContent;
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { clearCurrentProfile, logoutUser, getCurrentProfile }
)(Header);
