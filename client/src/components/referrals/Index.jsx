import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getMyRefferals } from "../../actions/profileActions";

import PageContent from "../layout/PageContent";
import Spinner from "../common/Spinner";
import ReferralItem from "./ReferralItem";

class MyReferrals extends Component {
  componentDidMount() {
    this.props.getMyRefferals();
  }

  render() {
    const { referrals, loading } = this.props.profile;

    let referralContent;

    if (referrals == null || loading) {
      referralContent = <Spinner />;
    } else {
      if (Object.keys(referrals).length > 0) {
        referralContent = (
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <h4 className="mt-0 header-title">My Refarrals</h4>
                  <p className="text-muted m-b-30 font-14">
                    List of all users who used your referral code to register.
                  </p>
                  <ReferralItem referrals={referrals} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        referralContent = (
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <div className="d-flex justify-content-center mb-4">
                    <span className="page-title text-center">
                      You have no past referrals!!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
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
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Reports</a>
                  </li>
                  <li className="breadcrumb-item active">My Referrals</li>
                </ol>
              </div>
              <h4 className="page-title">My Referrals</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        {referralContent}
      </PageContent>
    );
  }
}

MyReferrals.propTypes = {
  getMyRefferals: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMyRefferals }
)(MyReferrals);
