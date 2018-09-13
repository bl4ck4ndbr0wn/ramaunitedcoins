import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../../actions/profileActions";

import PageContent from "../../layout/PageContent";
import Spinner from "../../common/Spinner";
import DHeader from "./DHeader";

class UserDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (!user.isVerified) {
      // this.props.history.push("/resendconfirmation");
      window.location.replace("/resendconfirmation");
    } else {
      if (profile === null || loading) {
        dashboardContent = <Spinner />;
      } else {
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <DHeader profile={profile} />
            </div>
          );
        } else {
          dashboardContent = (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Profile</h4>

                    <div
                      className="alert alert-info alert-dismissible fade show"
                      role="alert"
                    >
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <strong>Heads up!</strong> You have not yet st up your
                      profile, please add some info.
                    </div>
                    <p className="text-muted m-b-30 font-14">Welcome {user.name}</p>

                    <div className="">
                      <a
                        href="/create-profile"
                        className="btn btn-success btn-lg btn-block"
                      >
                        <span className="visible-content">Getting Started</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }

    return (
      <PageContent>
        {/* <!-- Page-Title --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Rama United Coins</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        {dashboardContent}
      </PageContent>
    );
  }
}

UserDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(UserDashboard);
