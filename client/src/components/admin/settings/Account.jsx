import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import { createAccounts } from "../../../actions/settingActions";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumb from "../../common/BreadCrumb";

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "ETH",
      address: "",
      isActive: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
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

Accounts.propTypes = {
  createAccounts: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setting: state.setting,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createAccounts }
)(withRouter(Accounts));
