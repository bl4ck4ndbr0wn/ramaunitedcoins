import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getCurrentTokens } from "../../actions/tokenActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Spinner from "../common/Spinner";
import CardUser from "./CardUser";
import Breadcrumb from "../common/BreadCrumb";
import DHeader from "./DHeader";
import Transaction from "./Transaction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getCurrentTokens();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { tokens } = this.props.token;

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
              {tokens == null || loading ? "" : <DHeader tokens={tokens} />}
              <CardUser
                user={user}
                profile={profile}
                onDeleteClick={this.onDeleteClick.bind(this)}
              />
              {tokens == null || loading ? "" : <Transaction tokens={tokens} />}
            </div>
          );
        } else {
          // User is loggedin but has no profile
          dashboardContent = (
            <div className="row  justify-content-md-center">
              <div className="col-lg-8">
                <div className="ibox ibox-fullheight">
                  <div className="ibox-head">
                    <div className="ibox-title">Welcome {user.name}</div>
                  </div>
                  <div className="ibox-body">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <p>
                          You have not yet st up your profile, please add some
                          info.
                        </p>
                        <a
                          href="/create-profile"
                          className="btn btn-pink btn-fix btn-animated from-left"
                        >
                          <span className="visible-content">
                            Getting Started
                          </span>
                          <span className="hidden-content">
                            <span className="btn-icon">
                              <i className="la la-user-plus" />
                              Add Info
                            </span>
                          </span>
                        </a>
                      </div>
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
      <div className="page-wrapper">
        {/* <!-- START HEADER--> */}
        <Header />

        {/* <!-- END HEADER--> */}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/* <!-- START PAGE CONTENT--> */}
          <div className="page-content fade-in-up">{dashboardContent}</div>
        </div>
        {/*   <!-- END PAGE CONTENT-->*/}

        <Footer />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentTokens: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  token: state.token,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCurrentTokens, deleteAccount }
)(Dashboard);
