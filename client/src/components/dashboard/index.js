import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentUser } from "../../actions/authActions";

import PageContent from "../layout/PageContent";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    const { user } = this.props.auth;

    console.log(user);

    if (!user.isVerified) {
      // Email Confirmation
      window.location.replace("/resendconfirmation");
    } else {
      user.role === "admin"
        ? window.location.replace("/admin/dashboard")
        : user.role === "agent"
          ? window.location.replace("/agent/dashboard")
          : window.location.replace("/user/dashboard");
    }

    return (
      <PageContent>
        {/* <!-- Page-Title --> */}
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">Rama United Coins</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              <h4 class="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
      </PageContent>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Dashboard);
