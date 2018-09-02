import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { getCurrentProfile } from "../../actions/profileActions";
import Header from "./Header";

class PageContent extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="container-fluid">{this.props.children}</div>
        </div>
        {/* <!-- Footer --> */}
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">© 2018 Rama United Coins</div>
            </div>
          </div>
        </footer>
        {/* <!-- End Footer --> */}
      </div>
    );
  }
}

PageContent.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
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
  { logoutUser, getCurrentProfile }
)(PageContent);
