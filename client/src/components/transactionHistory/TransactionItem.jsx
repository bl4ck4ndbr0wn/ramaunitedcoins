import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import visa from "../../assets/img/logos/payment/visa.png";
import ltc from "../../assets/img/logos/payment/LTC.png";
import btc from "../../assets/img/logos/payment/btc.png";
import eth from "../../assets/img/logos/payment/Ethereum.png";
import btch from "../../assets/img/logo/btch.png";
import isEmpty from "../../validation/is-empty";

export default class TransactionItem extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      mode: "",
      price: 0
    };
  }

  componentDidMount() {
    const dict = ["BTC", "LTC", "ETH", "BCH"];

    Object.values(dict).map(mode => {
      fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${mode}&tsyms=USD`
      )
        .then(response => response.json())
        .then(responseData => {
          let usd = responseData.USD;
          this.setState({ mode, price: usd });
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    const { mode, price } = this.state;

    const transaction = this.props.tokens.map(token => {
      let image;
      let symbol;
      let priceAvg = 0;

      if (token.modetransfer === mode) priceAvg = price;

      if (token.modetransfer === "Bank") (image = visa), (symbol = "$");
      else if (token.modetransfer === "LTC") (image = ltc), (symbol = "LTC");
      else if (token.modetransfer === "BTC") (image = btc), (symbol = "BTC");
      else if (token.modetransfer === "ETH") (image = eth), (symbol = "ETH");
      else if (token.modetransfer === "BCH") (image = btch), (symbol = "BCH");

      return (
        <tr key={token._id}>
          <td>
            <a href="javascript:;">{token._id}</a>
          </td>
          <td>
            <div className="media-img">
              <img src={image} alt="image" width="60" /> {token.modetransfer}
            </div>
          </td>
          <td>
            {symbol} {token.amount}
            {token.modetransfer === "Bank" ? (
              ""
            ) : (
              <div className="media-body">
                <div className="media-heading">
                  1 {token.modetransfer} : {priceAvg} USD
                </div>
              </div>
            )}
          </td>
          <td>
            <span
              className={`badge badge-${
                token.confirmed ? "success" : "primary"
              } badge-pill`}
            >
              {token.confirmed ? "Confirmed" : "Pending"}
            </span>
          </td>
          <td>
            <i
              className={`ti-${token.document.length > 1 ? "files" : "file"}`}
            />{" "}
            {token.document.length}
          </td>
          <td>
            <Moment format="DD.MM.YYYY">{token.date}</Moment>
          </td>
        </tr>
      );
    });
    return (
      <div className="table-responsive row">
        <table id="datatable" class="table table-bordered">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Mode of Payment</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Document</th>
              <th>Date</th>
              <th className="no-sort" />
            </tr>
          </thead>
          <tbody>{transaction}</tbody>
        </table>
      </div>
    );
  }
}
