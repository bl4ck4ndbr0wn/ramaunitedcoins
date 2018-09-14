import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import QRCode from "qrcode.react";

import { createToken } from "../../../actions/tokenActions";
import {
  getSettings,
  fetchExchange
} from "../../../actions/admin/settingAction";

import PageContent from "../../layout/PageContent";
import SelectListGroup from "../../common/SelectListGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import isEmpty from "../../../validation/is-empty";

import visa from "../../../assets/img/logos/payment/visa.png";
import ltc from "../../../assets/img/logos/payment/LTC.png";
import btc from "../../../assets/img/logos/payment/btc.png";
import eth from "../../../assets/img/logos/payment/Ethereum.png";
import btch from "../../../assets/img/logo/btch.png";
import Spinner from "../../common/Spinner";

class BuyToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modetransfer: "",
      amount: "",
      address: "",
      price: "",
      bonus: "",
      data: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    console.log(nextState);

    if (nextProps.setting.settings) {
      const setting = nextProps.setting.settings;

      const account = setting.account.find(
        account => account.isActive === true
      );
      const round = setting.round.find(round => round.isActive === true);
      // If account field doesnt exist, make empty string
      account.address = !isEmpty(account.address) ? account.address : "";
      // If round field doesnt exist, make empty string
      round.address = !isEmpty(round.address) ? round.address : "";

      // Set component fields state
      this.setState({
        address: account.address,
        price: round.price,
        bonus: round.bonus
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const { modetransfer, amount, price, bonus } = this.state;

    const tokenData = {
      modetransfer,
      amount,
      price,
      bonus
    };

    this.props.createToken(tokenData, this.props.history);
  }

  render() {
    const { errors, modetransfer, data } = this.state;
    const { settings, loading } = this.props.setting;

    let image;
    let symbol;
    let tokenInfo;
    let result;
    let ruc = 0;
    let rcc = 0;
    let amount_in_dolars = 0;
    let curent_mode = {};

    if (modetransfer === "Bank") (image = visa), (symbol = "$");
    else if (modetransfer === "LTC") (image = ltc), (symbol = "LTC");
    else if (modetransfer === "BTC") (image = btc), (symbol = "BTC");
    else if (modetransfer === "ETH") (image = eth), (symbol = "ETH");
    else if (modetransfer === "BCH") (image = btch), (symbol = "BCH");

    // Select options for mode
    const options = [
      { label: "Payment Method: *", value: 0 },
      { label: "Bank Transfer", value: "Bank" },
      { label: "ETH", value: "ETH" },
      { label: "BTC", value: "BTC" },
      { label: "LTC", value: "LTC" },
      { label: "BCH", value: "BCH" }
    ];

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
          result = 0;
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

        let bank_rcc = this.state.amount * this.state.price;
        let bank_ruc = bank_rcc * (this.state.bonus / 100);

        tokenInfo =
          isEmpty(this.state.modetransfer) ||
          this.state.modetransfer === "0" ? (
            ""
          ) : (
            <div className="col-md-4 col-xl-4">
              <div className="mini-stat clearfix bg-info">
                <span className="mini-stat-icon bg-light">
                  <img src={image} alt="image" width="60" />
                </span>
                {modetransfer === "Bank" ? (
                  <div className="mini-stat-info text-right text-light">
                    <span className="counter text-white">{bank_rcc} RCC</span>
                    {bank_ruc} RUC
                  </div>
                ) : (
                  <div className="mini-stat-info text-right text-light">
                    <span className="counter text-white">{rcc} RCC</span>
                    {ruc} RUC
                  </div>
                )}
                {modetransfer === "Bank" ? (
                  ""
                ) : (
                  <div className="mb-0 m-t-20 form-group">
                    <span className="text-white">
                      Bank in to this company {modetransfer} address.
                    </span>
                    <TextFieldGroup
                      placeholder={`Company ${modetransfer} Address.`}
                      type="number"
                      name="address"
                      value={result.address}
                      onChange={this.onChange}
                    />
                    <QRCode
                      value={result.address}
                      style={{
                        height: "100px",
                        width: "100px"
                      }}
                    />
                  </div>
                )}

                <p className="mb-0 m-t-20 text-light">
                  Total investment:{" "}
                  {modetransfer === "Bank"
                    ? this.state.amount
                    : amount_in_dolars}{" "}
                  USD
                </p>
                {modetransfer === "Bank" ? (
                  ""
                ) : (
                  <span className="mb-0 m-t-20 text-light">
                    1 {modetransfer} : {curent_mode.price} USD
                  </span>
                )}
              </div>
            </div>
          );
      }
    }

    return (
      <PageContent>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Request</a>
                  </li>
                  <li className="breadcrumb-item active">Request RCC Tokens</li>
                </ol>
              </div>
              <h4 className="page-title">Request RCC Tokens</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div className="row justify-content-md-center">
          {tokenInfo}
          <div
            // className="col-8"
            className={
              isEmpty(modetransfer) || modetransfer === "0"
                ? `col-md-8 col-xl-8`
                : `col-md-6 col-xl-6`
            }
          >
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Create Profile</h4>
                <form className="" onSubmit={this.onSubmit}>
                  <div className="form-group text-center row m-t-30">
                    <div className="col-12">
                      <SelectListGroup
                        placeholder="Payment Method"
                        label="Payment Method: "
                        name="modetransfer"
                        value={modetransfer}
                        onChange={this.onChange}
                        options={options}
                        error={errors.modetransfer}
                        info="Give us an idea of mode of transfer"
                      />
                    </div>
                    <div className="col-12">
                      <TextFieldGroup
                        placeholder={
                          isEmpty(modetransfer)
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
                          isEmpty(modetransfer)
                            ? "Amount in Selected mode of Transfer"
                            : this.state.modetransfer === "Bank"
                              ? "Investment Amount in USD"
                              : `Investment Amount in ${
                                  this.state.modetransfer
                                }`
                        }
                      />
                    </div>
                    <div className="col-6">
                      <TextFieldGroup
                        placeholder={`Price per coin in $.`}
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.onChange}
                        error={errors.price}
                        disabled="disabled"
                        info={`Investor price per coin in $.`}
                      />
                    </div>
                    <div className="col-6">
                      <TextFieldGroup
                        placeholder={`Bonus percentage.`}
                        type="number"
                        name="bonus"
                        value={this.state.bonus}
                        onChange={this.onChange}
                        error={errors.bonus}
                        disabled="disabled"
                        info={`Investor Bonus in %.`}
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Next
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

BuyToken.propTypes = {
  fetchExchange: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  createToken: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setting: state.setting,
  token: state.token,
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createToken,
      getSettings,
      fetchExchange
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyToken);
