import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getSettings } from "../../../actions/admin/settingAction";

import PageContent from "../../layout/PageContent";
import Spinner from "../../common/Spinner";
import PhaseVolumeFeed from "./PhaseVolumeFeed";
import AccountAddressFeed from "./AccountAddressFeed";

class Settings extends Component {
  componentDidMount() {
    this.props.getSettings();
  }

  render() {
    const { settings, loading } = this.props.setting;
    console.log(settings);

    let settingContent;

    if ((settings === null) | loading) {
      settingContent = <Spinner />;
    } else {
      // Checking if settings has data
      if (Object.keys(settings).length > 0) {
        settingContent = (
          <div className="row">
            <PhaseVolumeFeed round={settings.round} />
            <AccountAddressFeed account={settings.account} />
          </div>
        );
      } else {
        settingContent = (
          <div class="row">
            <div className="col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <h4 class="mt-0 header-title">Phase and Selling Volumes</h4>
                  <p class="text-muted m-b-30 font-14">
                    Current Investor Round
                  </p>
                  <div className="ibox-body">No Data Found.</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="card m-b-30">
                <div class="card-body">
                  <h4 class="mt-0 header-title">Company Addresses</h4>
                  <p class="text-muted m-b-30 font-14">
                    Company Default addresses
                  </p>
                  <div className="ibox-body">No Data Found.</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <PageContent>
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Settings</a>
                  </li>
                  <li class="breadcrumb-item active">
                    Company Account Addresses
                  </li>
                </ol>
              </div>
              <h4 class="page-title">Company Account Addresses</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        {settingContent}
      </PageContent>
    );
  }
}

Settings.propTypes = {
  getSettings: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setting: state.setting,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSettings }
)(withRouter(Settings));
