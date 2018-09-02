import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import { requestTokens } from "../../../actions/admin/requestAction";
import { getAllUsers } from "../../../actions/admin/userAction";
import PageContent from "../../layout/PageContent";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import isEmpty from "../../../validation/is-empty";

class RequestToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modetransfer: "",
      amount: "",
      address: "",
      user: "",
      fileupload: {},
      confirmed: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // document.forms[1].dropzone.files
    this.setState({ errors: {} });

    if (document.forms[1].dropzone.files.length > 0) {
      this.setState({ fileupload: document.forms[1].dropzone.files });
    } else {
      this.setState({ errors: { file: "Field can not be empty" } });
    }

    const { modetransfer, amount, user, fileupload, confirmed } = this.state;

    const fd = new FormData();
    fd.append("fileUpload", this.state.fileupload, this.state.fileupload.name);

    const tokenData = {
      modetransfer,
      amount,
      user,
      fd,
      confirmed
    };

    this.props.requestTokens(tokenData, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { users, loading } = this.props.userAdmin;

    let infoError;
    if (!isEmpty(errors.file)) {
      infoError = "Field can not be empty";
    } else {
      infoError = "";
    }

    let userOptions = []; // create an empty array

    if (users === null || loading) {
      userOptions.push({
        label: "* Select a User",
        value: 0
      });
    } else {
      // Check if logged in user has users data
      if (Object.keys(users).length > 0) {
        users.map(user => {
          userOptions.push({
            label: user.name,
            value: user._id
          });
        });
      }
    }
    // Select options for status
    const options = [
      { label: "* Select Payment Method", value: 0, icon: "ti-wallet" },
      { label: "Bank Transfer", value: "Bank", icon: "ti-credit-card" },
      { label: "ETH", value: "ETH", icon: "ti-wallet" },
      { label: "BTC", value: "BTC", icon: "ti-wallet" },
      { label: "LTC", value: "LTC", icon: "ti-wallet" },
      { label: "BCH", value: "BCH", icon: "ti-wallet" }
    ];

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
                    <a href="#">Request</a>
                  </li>
                  <li class="breadcrumb-item active">Request Token</li>
                </ol>
              </div>
              <h4 class="page-title">Request Token</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          <div class="col-8">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">New Token Request</h4>
                <form class="" onSubmit={this.onSubmit}>
                  <div className="form-group text-center row m-t-20">
                    <div className="col-12">
                      <SelectListGroup
                        placeholder="Select User"
                        name="user"
                        value={this.state.user}
                        onChange={this.onChange}
                        options={userOptions}
                        error={errors.user}
                        info="Give us an idea of mode of transfer"
                      />
                    </div>
                    <div className="col-6">
                      <SelectListGroup
                        placeholder="Select Payment Method"
                        name="modetransfer"
                        value={this.state.modetransfer}
                        onChange={this.onChange}
                        options={options}
                        error={errors.modetransfer}
                        info="Give us an idea of mode of transfer"
                      />
                      {this.state.modetransfer === "ETH" ? (
                        <TextFieldGroup
                          placeholder="Company ETH Address."
                          type="number"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                          disabled="disabled"
                          info="Bank in to this company Ethereum address."
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-6">
                      <TextFieldGroup
                        placeholder={
                          isEmpty(this.state.modetransfer)
                            ? "Amount in Selected mode of Transfer"
                            : `Enter number of ${this.state.modetransfer}`
                        }
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                        error={errors.amount}
                        info={
                          isEmpty(this.state.modetransfer)
                            ? "Amount in Selected mode of Transfer"
                            : `Enter number of ${
                                this.state.modetransfer
                              } to transfer`
                        }
                      />
                    </div>
                    <div className="col-12 ">
                      <div class="m-b-30">
                        <form action="#" class="dropzone">
                          <div class="fallback">
                            <input
                              name="file"
                              type="file"
                              multiple="multiple"
                            />
                          </div>
                        </form>
                        {infoError}
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="m-b-30">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            onClick={() => {
                              this.setState(prevState => ({
                                confirmed: !prevState.confirmed
                              }));
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Confrim User Request
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Request RCC Token
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

RequestToken.propTypes = {
  requestTokens: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  setting: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  errors: state.errors,
  setting: state.setting,
  userAdmin: state.userAdmin
});
export default connect(
  mapStateToProps,
  { requestTokens, getAllUsers }
)(withRouter(RequestToken));
