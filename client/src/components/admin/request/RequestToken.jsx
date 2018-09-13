import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";

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
      fileupload: [],
      confirmed: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._onFileRemove = this._onFileRemove.bind(this);
    this._onFileAdded = this._onFileAdded.bind(this);
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

  _onFileRemove(key) {
    let { fileupload } = this.state;

    fileupload.splice(key, 1);

    this.setState({ fileupload: fileupload });
  }

  _onFileAdded(event) {
    let fileupload = _.get(this.state, "fileupload", []);

    _.each(_.get(event, "target.files", []), file => {
      fileupload.push(file);
    });

    this.setState({ fileupload: fileupload });
    console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();
    // document.forms[1].dropzone.files
    this.setState({ errors: {} });
    const { modetransfer, amount, user, fileupload, confirmed } = this.state;

    const formData = new FormData();

    Object.entries(this.state).map(state => {
      if (state[0] === "fileupload") {
        formData.append("fileupload", fileupload);
      }
      formData.append(state[0], state[1]);
    });
    console.log(formData);

    // formData.append('fileupload', file, file.filename);

    // const tokenData = {
    //   modetransfer,
    //   amount,
    //   user,
    //   fileupload,
    //   confirmed
    // };
    // console.log(tokenData);
    this.props.requestTokens(formData, this.props.history);
  }
  render() {
    const { errors, fileupload } = this.state;
    const { users, loading } = this.props.userAdmin;

    let userOptions = [
      { label: "* Select a User", value: 0, icon: "ti-wallet" }
    ]; // create an empty array

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
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Request</a>
                  </li>
                  <li className="breadcrumb-item active">Request Token</li>
                </ol>
              </div>
              <h4 className="page-title">Request Token</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div className="row justify-content-md-center">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">New Token Request</h4>
                <form className="" onSubmit={this.onSubmit}>
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
                            : this.state.modetransfer === "Bank"
                              ? "Investment Amount in USD"
                              : `Investment Amount in ${
                                  this.state.modetransfer
                                }`
                        }
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                        error={errors.amount}
                        info={
                          isEmpty(this.state.modetransfer)
                            ? "Amount in Selected mode of Transfer"
                            : this.state.modetransfer === "Bank"
                              ? "Investment Amount in USD"
                              : `Investment Amount in ${
                                  this.state.modetransfer
                                }`
                        }
                      />
                    </div>
                    <div className="col-12 ">
                      <div className="m-b-30">
                        {/* <form action="#" className="dropzone">
                          <div className="fallback">
                            <input
                              name="file"
                              type="file"
                              multiple="multiple"
                            />
                          </div>
                        </form> */}
                        {fileupload.length ? (
                          <div className={"app-files-selected"}>
                            {fileupload.map((file, index) => {
                              return (
                                <div
                                  key={index}
                                  className={"app-files-selected-item"}
                                >
                                  <div className={"filename"}>{file.name}</div>
                                  <div className={"file-action"}>
                                    <button
                                      onClick={() => this._onFileRemove(index)}
                                      type={"button"}
                                      className={"app-file-remove"}
                                    >
                                      X
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                        <div
                          className={classNames("app-file-select-zone", {
                            error: _.get(errors, "fileupload")
                          })}
                        >
                          <label htmlFor={"input-file"}>
                            <input
                              onChange={this._onFileAdded}
                              id={"input-file"}
                              type="file"
                              multiple={true}
                            />
                            {fileupload.length ? (
                              <span
                                className={
                                  "app-upload-description text-uppercase"
                                }
                              >
                                Add more files
                              </span>
                            ) : (
                              <span>
                                <span className={"app-upload-icon"}>
                                  <i className={"icon-picture-streamline"} />{" "}
                                </span>
                                <span className={"app-upload-description"}>
                                  Drag and drop your files here.
                                </span>
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="m-b-30">
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
