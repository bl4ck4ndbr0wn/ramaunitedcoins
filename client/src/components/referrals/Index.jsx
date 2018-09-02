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
          <div class="row">
            <div class="col-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <h4 class="mt-0 header-title">My Refarrals</h4>
                  <p class="text-muted m-b-30 font-14">
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
          <div class="row">
            <div class="col-12">
              <div class="card m-b-30">
                <div class="card-body">
                  <div className="d-flex justify-content-center mb-4">
                    <span class="page-title text-center">
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
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Reports</a>
                  </li>
                  <li class="breadcrumb-item active">My Referrals</li>
                </ol>
              </div>
              <h4 class="page-title">My Referrals</h4>
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
