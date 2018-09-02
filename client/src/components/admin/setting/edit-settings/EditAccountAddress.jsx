import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../../../common/TextFieldGroup";
import {
  createAccounts,
  getSettings
} from "../../../../actions/admin/settingAction";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import Breadcrumb from "../../../common/BreadCrumb";
import isEmpty from "../../../../validation/is-empty";
import PageContent from "../../../layout/PageContent";

class EditAccountAddress extends Component {
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
                  <li class="breadcrumb-item active">Edit Company Address</li>
                </ol>
              </div>
              <h4 class="page-title">Edit Company Address</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          <div class="col-8">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">Edit Company Address</h4>

                <form class="" onSubmit={this.onSubmit}>
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
                  <div className="form-group text-center row m-t-20">
                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Save Changes
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

EditAccountAddress.propTypes = {
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
)(withRouter(EditAccountAddress));
