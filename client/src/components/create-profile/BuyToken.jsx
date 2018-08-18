import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TextFieldGroup from "../common/TextFieldGroup";
import { createToken } from "../../actions/tokenActions";
import Breadcrumb from "../common/BreadCrumb";
import SelectListGroup from "../common/SelectListGroup";

class BuyToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modetransfer: "",
      amount: "",
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
    const { errors } = this.state;

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
      <div className="page-wrapper">
        {/*
  <!-- START HEADER-->*/}
        <Header /> {/*
  <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
    <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="Buy KYC Tokens" item="Buy KYC" />
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
                          placeholder="* Amount in $"
                          type="number"
                          name="amount"
                          value="032863897126438726497862317648927634762834213"
                          error={errors.amount}
                          disabled="disabled"
                          info="bank in to this company Ethereum address."
                        />
                      ) : (
                        ""
                      )}

                      <TextFieldGroup
                        placeholder="* Amount in $"
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                        error={errors.amount}
                        info="Data format $99.99"
                      />
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
  token: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createToken }
)(withRouter(BuyToken));
