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
      data: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getSettings();

    const dict = ["BTC", "LTC", "ETH", "BCH"];

    let currencies = dict.map(mode => {
      return fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${mode}&tsyms=USD`
      )
        .then(response => response.json())
        .then(responseData => {
          return Object.keys(responseData).map(key => ({
            mode,
            key,
            price: responseData[key]
          }));
        })
        .catch(err => console.log(err));
    });

    Promise.all(currencies).then(data => {
      this.setState({ data });
    });
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
    const { errors, modetransfer, price, bonus, data } = this.state;
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
    let ruc = 0;
    let rcc = 0;
    let amount_in_dolars = 0;
    let curent_mode = {};
    let bank_rcc = 0;
    let bank_ruc = 0;
    let converted_coins;

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

        // Get current currency rate
        curent_mode = (data.find(i =>
          i.find(j => j.mode === this.state.modetransfer)
        ) || [{}])[0];

        if (!isEmpty(this.state.amount)) {
          amount_in_dolars = this.state.amount * curent_mode.price;
          rcc = amount_in_dolars * this.state.price;
          ruc = rcc * (this.state.bonus / 100);
        }

        bank_rcc = this.state.amount * this.state.price;
        bank_ruc = bank_rcc * (this.state.bonus / 100);

        if (isEmpty(this.state.amount)) {
          converted_coins = "";
        } else {
          if (isEmpty(price) || isEmpty(bonus) || isEmpty(modetransfer)) {
            converted_coins = (
              <div className="col-12">
                <div className="alert alert-warning alert-dismissible">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                  <strong>Warning</strong>
                  <br />
                  Mode of transfer or Round price or Bonus can not be blank.
                </div>
              </div>
            );
          } else {
            converted_coins = (
              <div class="col-6">
                <div class="card m-b-30 text-white card-success">
                  <div class="card-body">
                    <blockquote class="card-bodyquote">
                      <p>{modetransfer === "Bank" ? bank_rcc : rcc} RCC</p>
                      <p>{modetransfer === "Bank" ? bank_ruc : ruc} RUC</p>
                      <p>
                        Total investment:{" "}
                        {modetransfer === "Bank"
                          ? this.state.amount
                          : amount_in_dolars}{" "}
                        USD
                      </p>
                      <footer>
                        {modetransfer === "Bank" ? (
                          ""
                        ) : (
                          <cite title="Source Title">
                            1 {modetransfer} : {curent_mode.price} USD
                          </cite>
                        )}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            );
          }
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
                    {converted_coins}
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
