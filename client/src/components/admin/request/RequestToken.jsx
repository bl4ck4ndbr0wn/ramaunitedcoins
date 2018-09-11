import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";

import { requestTokens } from "../../../actions/admin/requestAction";
import { getAllUsers } from "../../../actions/admin/userAction";
import { getSettings } from "../../../actions/admin/settingAction";

import PageContent from "../../layout/PageContent";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";
import isEmpty from "../../../validation/is-empty";
import Spinner from "../../common/Spinner";

class RequestToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modetransfer: "",
      amount: "",
      address: "",
      user: "",
      confirmed: false,
      price: "",
      bonus: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getSettings();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.setting.settings) {
      const setting = nextProps.setting.settings;
      const account = setting.account.find(
        account => account.isActive === true
      );
      const round = setting.round.find(round => round.isActive === true);
      // If account field doesnt exist, make empty string
      account.address = !isEmpty(account.address) ? account.address : "";

      // Set component fields state
      this.setState({
        address: account.address
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });
    const { modetransfer, amount, user, confirmed, price, bonus } = this.state;

    const tokenData = {
      modetransfer,
      amount,
      user,
      confirmed,
      price,
      bonus
    };

    this.props.requestTokens(tokenData, this.props.history);
  }
  render() {
    const { errors, modetransfer, price, bonus } = this.state;
    const { users, loading } = this.props.userAdmin;
    const { settings } = this.props.setting;

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

    let tokenInfo;
    let result;

    if ((settings === null) | loading) {
      tokenInfo = <Spinner />;
    } else {
      // Checking if settings has data
      if (Object.keys(settings).length > 0) {
        if (
          modetransfer === "Bank" ||
          modetransfer === "0" ||
          modetransfer === ""
        ) {
          result = "";
        } else {
          result = settings.account.find(accc => accc.type === modetransfer);
        }

        tokenInfo =
          isEmpty(this.state.modetransfer) ||
          this.state.modetransfer === "0" ||
          this.state.modetransfer === "Bank" ? (
            ""
          ) : (
            <div className="col-6">
              <TextFieldGroup
                placeholder={`Company ${modetransfer} Address.`}
                type="number"
                name="address"
                value={result.address}
                onChange={this.onChange}
                disabled="disabled"
                info={` Bank in to this company ${modetransfer} address.`}
              />
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
          <div className="col-8">
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
                    <div
                      className={
                        isEmpty(modetransfer) ||
                        modetransfer === "0" ||
                        modetransfer === "Bank"
                          ? "col-12"
                          : "col-6"
                      }
                    >
                      <SelectListGroup
                        placeholder="Select Payment Method"
                        name="modetransfer"
                        value={this.state.modetransfer}
                        onChange={this.onChange}
                        options={options}
                        error={errors.modetransfer}
                        info="Give us an idea of mode of transfer"
                      />
                    </div>
                    {tokenInfo}
                    <div className="col-6">
                      <TextFieldGroup
                        placeholder={`Price per coin in $.`}
                        type="number"
                        name="price"
                        value={price}
                        onChange={this.onChange}
                        error={errors.price}
                        info={`Investor price per coin.`}
                      />
                    </div>
                    <div className="col-6">
                      <TextFieldGroup
                        placeholder={`Bonus percentage.`}
                        type="number"
                        name="bonus"
                        value={bonus}
                        onChange={this.onChange}
                        error={errors.bonus}
                        info={`Investor Bonus.`}
                      />
                    </div>
                    <div className="col-12">
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
  getSettings: PropTypes.func.isRequired,
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
  { requestTokens, getAllUsers, getSettings }
)(withRouter(RequestToken));
