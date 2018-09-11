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
      data: {}
    };
  }

  componentDidMount() {
    const dict = ["BTC", "LTC", "ETH", "BCH"];
    var myMap = new Map();
    let data = {};

    Object.values(dict).map(mode => {
      fetch(`https://api.coinmarketcap.com/v2/ticker/`)
        .then(response => response.json())
        .then(responseData => {
          // const currency = responseData.find(coin => coin.symbol === mode);
          Object.values(responseData.data).map(currency => {
            if (currency.symbol === mode) {
              let usd = currency.quotes.USD.price;
              // myMap.set(mode, usd);
              data[mode] = usd;
              // data.push({
              //   key: mode,
              //   value: usd
              // });
            }
          });
        })
        .catch(err => console.log(err));
    });
    this.setState({ data });
  }

  render() {
    const transaction = this.props.tokens.map(token => {
      let image;
      let symbol;
      let priceAvg = 0;

      // const currency = this.state.data.find(
      //   curr => curr[token.modetransfer] === token.modetransfer
      // );

      console.log(this.state.data.ETH);

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
          <td>{token.user.name}</td>
          <td>
            <div className="media-img">
              <img src={image} alt="image" width="30" /> {token.modetransfer}
            </div>
          </td>
          <td>${token.price}</td>
          <td>{token.bonus}%</td>
          <td>
            {token.modetransfer === "Bank"
              ? `${symbol} ${token.amount}`
              : `${token.amount}  ${symbol}`}
            {token.modetransfer === "Bank" ? (
              ""
            ) : (
              <div className="media-body">
                <div className="media-heading" style={{ fontSize: ".75rem" }}>
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
          <td>
            <Link
              to={`/document/${token._id}`}
              type="button"
              className="btn btn-secondary"
              data-toggle="tooltip"
              data-placement="up"
              title="Upload Document"
            >
              <i className="fa fa-upload" />
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <div className="table-responsive row">
        <table id="datatable" className="table table-bordered">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Name</th>
              <th>Mode of Payment</th>
              <th>Price</th>
              <th>Bonus</th>
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
