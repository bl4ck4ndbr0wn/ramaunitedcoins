import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../../common/TextFieldGroup";
import SelectListGroup from "../../../common/SelectListGroup";
import {
  createAccounts,
  getSettings
} from "../../../../actions/settingActions";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import Breadcrumb from "../../../common/BreadCrumb";
import isEmpty from "../../../../validation/is-empty";

class EditAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      address: "",
      isActive: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.setting.settings) {
      const account = nextProps.setting.settings.account;
      const result = account.find(
        account => account._id === this.props.match.params.id
      );
      // If account field doesnt exist, make empty string
      result.address = !isEmpty(result.address) ? result.address : "";
      result.type = !isEmpty(result.type) ? result.type : "";
      result.isActive = !isEmpty(result.isActive) ? result.isActive : false;

      // Set component fields state
      this.setState({
        type: result.type,
        address: result.address,
        isActive: result.isActive
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const accountData = {
      type: this.state.type,
      address: this.state.address,
      isActive: this.state.isActive
    };

    this.props.createAccounts(accountData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="page-wrapper">
        {/*
    <!-- START HEADER-->*/}
        <Header />
        {/*
    <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
      <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="Company Account Setup" item="Settings" />
          <div className="page-content fade-in-up">
            <div className="row  justify-content-center">
              <div className="col-md-6">
                <div className="ibox">
                  <div className="ibox-head">
                    <div className="ibox-title">Company Account Setup</div>
                  </div>
                  <form className="form-info" onSubmit={this.onSubmit}>
                    <div className="ibox-body">
                      <TextFieldGroup
                        placeholder="* Account Type"
                        type="text"
                        name="type"
                        label="Account Type"
                        disabled
                        value={this.state.type}
                        onChange={this.onChange}
                        error={errors.type}
                        info="Data format ETH Address"
                      />
                      <TextFieldGroup
                        placeholder="* Account Address"
                        type="number"
                        name="address"
                        label="Account Address No."
                        value={this.state.address}
                        onChange={this.onChange}
                        error={errors.address}
                        info="Data format ETH Address"
                      />
                      <div className="form-group">
                        <input
                          type="checkbox"
                          name="isActive"
                          onClick={() => {
                            this.setState(prevState => ({
                              isActive: !prevState.isActive
                            }));
                          }}
                        />

                        <small className="form-text text-muted">
                          Make Default System Account Address.
                        </small>
                      </div>
                    </div>
                    <div className="ibox-footer">
                      <button
                        className="btn btn-primary btn-fix mr-4"
                        type="submit"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditAccounts.propTypes = {
  createAccounts: PropTypes.func.isRequired,
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
  { createAccounts, getSettings }
)(withRouter(EditAccounts));
