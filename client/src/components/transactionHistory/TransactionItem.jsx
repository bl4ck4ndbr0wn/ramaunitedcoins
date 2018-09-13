import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import visa from "../../assets/img/logos/payment/visa.png";
import ltc from "../../assets/img/logos/payment/LTC.png";
import btc from "../../assets/img/logos/payment/btc.png";
import eth from "../../assets/img/logos/payment/Ethereum.png";
import btch from "../../assets/img/logo/btch.png";
import isEmpty from "../../validation/is-empty";
import { Promise } from "mongoose";

export default class TransactionItem extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
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

  render() {
    const { data } = this.state;

    const transactions = this.props.tokens.map(token => {
      let image;
      let symbol;

      let curent_mode = (data.find(i =>
        i.find(j => j.mode === token.modetransfer)
      ) || [{}])[0];
      console.log(curent_mode);

      if (token.modetransfer === "Bank") (image = visa), (symbol = "$");
      else if (token.modetransfer === "LTC") (image = ltc), (symbol = "LTC");
      else if (token.modetransfer === "BTC") (image = btc), (symbol = "BTC");
      else if (token.modetransfer === "ETH") (image = eth), (symbol = "ETH");
      else if (token.modetransfer === "BCH") (image = btch), (symbol = "BCH");

      return (
        <tr key={token._id}>
          <td>
            <a href="javascript:;">
              {token._id.substring(0, 6)}
              ...
            </a>
          </td>
          <td>
            <div className="media-img">
              <img src={image} alt="image" width="30" /> {token.modetransfer}
            </div>
          </td>
          <td>
            {symbol} {token.amount}
            {token.modetransfer === "Bank" ? (
              ""
            ) : (
              <div className="media-body">
                <div
                  className="media-heading"
                  style={{ fontSize: "0.7rem", color: "#0f9cf3" }}
                >
                  1 {token.modetransfer} : {curent_mode ? curent_mode.price : 0}{" "}
                  USD
                </div>
              </div>
            )}
          </td>
          <td>{token.rcc}</td>
          <td>{token.ruc}</td>
          <td>{token.round_price}</td>
          <td>{token.round_bonus}</td>
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
            <Moment format="DD.MM.YYYY HH:mm">{token.date}</Moment>
          </td>
          <td>
            <Link to={`/transaction/${token._id}`} lass="text-muted font-16">
              <i className="fa fa-edit" />
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
              <th>Mode of Payment</th>
              <th>Total Price</th>
              <th>RCC</th>
              <th>RUC</th>
              <th>Round Price</th>
              <th>Round Bonus</th>
              <th>Status</th>
              <th>Document</th>
              <th>Date</th>
              <th className="no-sort" />
            </tr>
          </thead>
          <tbody>{transactions}</tbody>
        </table>
      </div>
    );
  }
}
