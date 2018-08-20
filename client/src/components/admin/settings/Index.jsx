import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getSettings } from "../../../actions/settingActions";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumb from "../../common/BreadCrumb";
import Spinner from "../../common/Spinner";
import RoundFeed from "./RoundFeed";
import AccountFeed from "./AccountFeed";

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
          <div class="row">
            <RoundFeed round={settings.round} />
            <AccountFeed account={settings.account} />
          </div>
        );
      } else {
        settingContent = (
          <div>
            <div class="col-md-6">
              <div class="ibox">
                <div class="ibox-head">
                  <div class="ibox-title">Invester Rounds</div>
                  <div class="ibox-tools">
                    <a class="ibox-collapse">
                      <i class="ti-angle-down" />
                    </a>
                    <a class="dropdown-toggle" data-toggle="dropdown">
                      <i class="ti-more-alt" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <Link to="/admin/settings/rounds" class="dropdown-item">
                        {" "}
                        <i class="ti-pencil-alt" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="ibox-body">No Data Found.</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="ibox">
                <div class="ibox-head">
                  <div class="ibox-title">Company Accounts</div>
                  <div class="ibox-tools">
                    <a class="ibox-collapse">
                      <i class="ti-angle-down" />
                    </a>
                    <a class="dropdown-toggle" data-toggle="dropdown">
                      <i class="ti-more-alt" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <Link to="/admin/settings/account" class="dropdown-item">
                        {" "}
                        <i class="ti-pencil-alt" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="ibox-body">No Data Found.</div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="page-wrapper">
        {/*
    <!-- START HEADER-->*/}
        <Header /> {/*
    <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
      <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="ACCOUNT SETTINGS" item="Settings" />
          <div className="page-content fade-in-up">{settingContent}</div>
        </div>
        {/*
    <!-- END PAGE CONTENT-->*/}
        <Footer />
      </div>
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
