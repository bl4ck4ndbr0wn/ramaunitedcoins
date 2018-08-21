import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import visa from "../../../assets/img/logos/payment/visa.png";
import ltc from "../../../assets/img/logos/payment/LTC.png";
import btc from "../../../assets/img/logos/payment/btc.png";
import eth from "../../../assets/img/logos/payment/Ethereum.png";

class TransactionInfo extends Component {
  render() {
    const { user, token } = this.props;
    let image;
    let symbol;

    if (token.modetransfer === "Bank") (image = visa), (symbol = "$");
    else if (token.modetransfer === "LTC") (image = ltc), (symbol = "LTC");
    else if (token.modetransfer === "BTC") (image = btc), (symbol = "BTC");
    else if (token.modetransfer === "ETH") (image = eth), (symbol = "ETH");

    return (
      <div class="col-xl-5">
        <div class="ibox">
          <div class="ibox-body">
            <h5 class="font-strong mb-4">Transaction Information</h5>
            <div class="row align-items-center mb-3">
              <div class="col-4 text-light">Total Price</div>
              <div class="col-8 h3 font-strong text-pink mb-0">
                $ {token.amount}
              </div>
            </div>
            <div class="row align-items-center mb-3">
              <div class="col-4 text-light">Date</div>
              <div class="col-8">
                <Moment format="YYYY.MM.DD">{token.date}</Moment>
              </div>
            </div>
            <div class="row align-items-center mb-3">
              <div class="col-4 text-light">Status</div>
              <div class="col-8">
                <span
                  class={`badge badge-${
                    token.confirmed ? "success" : "info"
                  } badge-pill`}
                >
                  {token.confirmed ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-4 text-light">Payment</div>
              <div class="col-8">
                <img src={image} alt={symbol} width="55" /> {symbol}
              </div>
            </div>
          </div>
        </div>
        <div class="ibox">
          <div class="ibox-body">
            <h5 class="font-strong mb-4">Buyer Information</h5>
            <div class="row align-items-center mb-3">
              <div class="col-4 text-light">Customer</div>
              <div class="col-8">{user.handle}</div>
            </div>
            <div class="row align-items-center mb-3">
              <div class="col-4 text-light">Address</div>
              <div class="col-8">{user.country}</div>
            </div>
            <div class="row align-items-center">
              <div class="col-4 text-light">Phone</div>
              <div class="col-8">{user.telephone}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TransactionInfo.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired
};
export default TransactionInfo;