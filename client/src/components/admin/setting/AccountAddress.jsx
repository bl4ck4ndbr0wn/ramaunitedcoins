import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";
import { createAccounts } from "../../../actions/admin/settingAction";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumb from "../../common/BreadCrumb";
import PageContent from "../../layout/PageContent";
import SelectListGroup from "../../common/SelectListGroup";

class AccountAddress extends Component {
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

    // Select options for status
    const options = [
      { label: "* Select Payment Method", value: 0, icon: "ti-wallet" },
      { label: "ETH", value: "ETH", icon: "ti-wallet" },
      { label: "BTC", value: "BTC", icon: "ti-wallet" },
      { label: "LTC", value: "LTC", icon: "ti-wallet" },
      { label: "BCH", value: "BCH", icon: "ti-wallet" }
    ];

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
                  <li className="breadcrumb-item active">Create Company Address</li>
                </ol>
              </div>
              <h4 className="page-title">Create Company Address</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div className="row justify-content-md-center">
          <div className="col-8">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">New Company Address</h4>

                <form className="" onSubmit={this.onSubmit}>
                  <div className="ibox-body">
                    <SelectListGroup
                      placeholder="Select Payment Method"
                      name="type"
                      value={this.state.type}
                      onChange={this.onChange}
                      options={options}
                      error={errors.type}
                      info="Company Address"
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
                  <div className="form-group text-center row m-t-20">
                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Save Company Address
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

AccountAddress.propTypes = {
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
)(withRouter(AccountAddress));
