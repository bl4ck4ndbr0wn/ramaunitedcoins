import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getSettings } from "../../../actions/admin/settingAction";

import PageContent from "../../layout/PageContent";
import Spinner from "../../common/Spinner";
import PhaseVolumeFeed from "./PhaseVolumeFeed";
import AccountAddressFeed from "./AccountAddressFeed";
import CommissionFeed from "./commision/CommissionFeed";

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
          <div class="tab-content">
            <div
              class="tab-pane active p-3"
              id="investor_round"
              role="tabpanel"
            >
              <PhaseVolumeFeed round={settings.round} />
            </div>
            <div class="tab-pane p-3" id="selling_volumes" role="tabpanel">
              <AccountAddressFeed account={settings.account} />
            </div>
            <div class="tab-pane p-3" id="commissions" role="tabpanel">
              <CommissionFeed commission={settings.commission} />
            </div>
          </div>
        );
      } else {
        settingContent = (
          <div class="tab-content">
            <div
              class="tab-pane active p-3"
              id="investor_round"
              role="tabpanel"
            >
              <p class="font-14 mb-0">No Data Found.</p>
            </div>
            <div class="tab-pane p-3" id="selling_volumes" role="tabpanel">
              <p class="font-14 mb-0">No Data Found.</p>
            </div>
            <div class="tab-pane p-3" id="commissions" role="tabpanel">
              <p class="font-14 mb-0">No Data Found.</p>
            </div>
          </div>
        );
      }
    }

    return (
      <PageContent>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Settings</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Company Account Addresses
                  </li>
                </ol>
              </div>
              <h4 className="page-title">Company Account Addresses</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        <div class="row">
          <div class="col-lg-12">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 className="mt-0 header-title">All Default Settings</h4>
                <p className="text-muted m-b-30 font-14">
                  Current Investor Round, Phase and Selling Volumes, Commissions
                </p>

                {/* <!-- Nav tabs --> */}
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#investor_round"
                      role="tab"
                    >
                      Current Investor Round
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#selling_volumes"
                      role="tab"
                    >
                      Phase and Selling Volumes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#commissions"
                      role="tab"
                    >
                      Commissions
                    </a>
                  </li>
                </ul>
                {settingContent}
              </div>
            </div>
          </div>
        </div>
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
