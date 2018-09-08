import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import QRCode from "qrcode.react";

import { createToken } from "../../../actions/tokenActions";
import { getSettings } from "../../../actions/admin/settingAction";

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
      currentRate: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getSettings();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps, nextState) {
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

    const { modetransfer, amount } = this.state;

    const tokenData = { modetransfer, amount };

    this.props.createToken(tokenData, this.props.history);
  }

  render() {
    const {
      errors,
      amount,
      price,
      bonus,
      modetransfer,
      currentRate
    } = this.state;
    const { settings, loading } = this.props.setting;

    let image;
    let symbol;
    let tokenInfo;
    let result;
    let ruc = 0;
    let rcc = 0;
    let ConvertedAmout;

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
          result = "";
        } else {
          result = settings.account.find(accc => accc.type === modetransfer);
        }

        tokenInfo =
          isEmpty(this.state.modetransfer) ||
          this.state.modetransfer === "0" ||
          modetransfer === "Bank" ? (
            ""
          ) : (
            <div class="col-md-6 col-xl-6">
              <div class="mini-stat clearfix bg-info">
                <span class="mini-stat-icon bg-light">
                  <img src={image} alt="image" width="60" />
                </span>
                <div class="mini-stat-info text-right text-light">
                  <span class="counter text-white">0 RCC</span>0 RUC
                </div>
                <div className="d-flex justify-content-between">
                  <div class="">
                    <span class="text-white">
                      Bank in to this company {modetransfer} address.
                    </span>
                    <TextFieldGroup
                      placeholder={`Company ${modetransfer} Address.`}
                      type="number"
                      name="address"
                      value={result.address}
                      onChange={this.onChange}
                    />
                  </div>
                  <div>
                    <QRCode
                      value={result.address}
                      style={{
                        height: "100px",
                        width: "100px"
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div class="mini-stat-info  text-light">
                    1 {symbol} : $10 USD
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }

    return (
      <PageContent>
        <div class="row">
          <div class="col-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Request</a>
                  </li>
                  <li class="breadcrumb-item active">Request RCC Tokens</li>
                </ol>
              </div>
              <h4 class="page-title">Request RCC Tokens</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          {tokenInfo}
          <div
            // class="col-8"
            class={
              isEmpty(modetransfer) ||
              modetransfer === "0" ||
              modetransfer === "Bank"
                ? `col-md-8 col-xl-8`
                : `col-md-6 col-xl-6`
            }
          >
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">Create Profile</h4>
                <form class="" onSubmit={this.onSubmit}>
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
export default connect(
  mapStateToProps,
  { createToken, getSettings }
)(withRouter(BuyToken));
