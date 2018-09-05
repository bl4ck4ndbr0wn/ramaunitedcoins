import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TextFieldGroup from "../common/TextFieldGroup";
import { createToken } from "../../actions/tokenActions";
import { getSettings } from "../../actions/settingActions";
import Breadcrumb from "../common/BreadCrumb";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/is-empty";

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onConvert(symbol) {
    if (symbol !== "Bank") {
      fetch("https://api.coinmarketcap.com/v2/ticker/")
        .then(response => response.json())
        .then(responseData => {
          if (responseData.data !== {}) {
            Object.entries(responseData.data).map(item => {
              if (item[1].symbol === symbol) {
                this.setState({ currentRate: item[1].quotes.USD.price });
              }
            });
          }
        })
        .catch();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { modetransfer, amount } = this.state;
    const tokenData = {
      modetransfer,
      amount
    };

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

    // Select options for status
    const options = [
      { label: "* Select Payment Method", value: 0, icon: "ti-wallet" },
      { label: "Bank Transfer", value: "Bank", icon: "ti-credit-card" },
      { label: "ETH", value: "ETH", icon: "ti-wallet" },
      { label: "BTC", value: "BTC", icon: "ti-wallet" },
      { label: "LTC", value: "LTC", icon: "ti-wallet" },
      { label: "BCH", value: "BCH", icon: "ti-wallet" }
    ];

    let ConvertedAmout;

    if (isEmpty(amount) || isEmpty(this.state.modetransfer)) {
      ConvertedAmout = "";
    } else {
      if (this.state.modetransfer) {
        this.onConvert(this.state.modetransfer);
        if (modetransfer === "Bank") {
          ConvertedAmout = "";
        } else {
          let rcc = amount / price;
          let ruc = amount * bonus;

          // RCC coin
          // 75% bonus of the RUC = 15,000 RUC
          ConvertedAmout = (
            <div>
              <label class="mb-0 mr-2">
                {modetransfer} Current Exchange Rate: {currentRate}
              </label>
              <br />
              <label class="mb-0 mr-2">
                RCC Tokens [{price}
                /coin]: {rcc}
              </label>
              <br />
              <label class="mb-0 mr-2">
                RUC Tokens [{bonus}
                %]: {ruc}
              </label>
            </div>
          );
        }
      } else {
        ConvertedAmout = "";
      }
    }

    return (
      <div className="page-wrapper">
        {/*
  <!-- START HEADER-->*/}
        <Header /> {/*
  <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
    <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="Buy Tokens" item="Buy Tokens" />
          <div className="page-content fade-in-up">
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <div className="ibox ibox-fullheight">
                  <div className="ibox-head">
                    <div className="ibox-title">Buy Tokens</div>
                  </div>
                  <form className="form-info" onSubmit={this.onSubmit}>
                    <div className="ibox-body">
                      <div className="row justify-content-md-center">
                        <div className="col-md-8">
                          <div className="card" />
                        </div>
                      </div>
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

                      <TextFieldGroup
                        placeholder={
                          isEmpty(modetransfer)
                            ? "Amount in Selected mode of Transfer"
                            : `Enter number of ${modetransfer}`
                        }
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                        error={errors.amount}
                        info={
                          isEmpty(modetransfer)
                            ? "Amount in Selected mode of Transfer"
                            : `Enter number of ${modetransfer} to transfer`
                        }
                      />
                      {ConvertedAmout}
                    </div>
                    <div
                      className="ibox-footer"
                      style={{
                        display: "flex",
                        justifyContent: " space-between"
                      }}
                    >
                      <Link
                        to="/"
                        className="btn btn-secondary ml-4 btn-fix"
                        type="reset"
                      >
                        Cancel
                      </Link>
                      <button
                        className="btn btn-primary btn-fix mr-4"
                        type="submit"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*
  <!-- END PAGE CONTENT-->*/}

          <Footer />
        </div>
      </div>
    );
  }
}

BuyToken.propTypes = {
  createToken: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  setting: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  errors: state.errors,
  setting: state.setting
});
export default connect(
  mapStateToProps,
  { createToken, getSettings }
)(withRouter(BuyToken));
