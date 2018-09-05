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
          <div className="row">
            <RoundFeed round={settings.round} />
            <AccountFeed account={settings.account} />
          </div>
        );
      } else {
        settingContent = (
          <div>
            <div className="col-md-6">
              <div className="ibox">
                <div className="ibox-head">
                  <div className="ibox-title">Invester Rounds</div>
                  <div className="ibox-tools">
                    <a className="ibox-collapse">
                      <i className="ti-angle-down" />
                    </a>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                      <i className="ti-more-alt" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        to="/admin/settings/rounds"
                        className="dropdown-item"
                      >
                        {" "}
                        <i className="ti-pencil-alt" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="ibox-body">No Data Found.</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ibox">
                <div className="ibox-head">
                  <div className="ibox-title">Company Accounts</div>
                  <div className="ibox-tools">
                    <a className="ibox-collapse">
                      <i className="ti-angle-down" />
                    </a>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                      <i className="ti-more-alt" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        to="/admin/settings/account"
                        className="dropdown-item"
                      >
                        {" "}
                        <i className="ti-pencil-alt" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="ibox-body">No Data Found.</div>
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
