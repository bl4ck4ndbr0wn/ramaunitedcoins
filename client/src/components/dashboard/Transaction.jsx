import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default class Transaction extends Component {
  render() {
    const transaction = this.props.tokens.map(token => {
      let image;
      let symbol;

      if (token.modetransfer === "Bank") (image = "visa.png"), (symbol = "$");
      else if (token.modetransfer === "LTC")
        (image = "LTC.png"), (symbol = "LTC");
      else if (token.modetransfer === "BTC")
        (image = "btc.png"), (symbol = "BTC");
      else if (token.modetransfer === "ETH")
        (image = "Ethereum.png"), (symbol = "ETH");

      return (
        <li className="media" key={token._id}>
          <div className="media-img">
            <img
              src={`assets/img/logos/payment/${image}`}
              alt="image"
              width="60"
            />
          </div>
          <div className="media-body">
            <div className="media-heading">
              {token.modetransfer}

              <h4 className="font-strong float-right text-right">
                <span
                  className={`badge ${
                    !token.confirmed ? " badge-primary" : "badge-success"
                  } badge-pill
      badge-pill`}
                >
                  {token.confirmed ? "Confirmed" : "Pending"}
                </span>
              </h4>
              <h4 className="font-strong float-right text-right">
                <sup className="text-pink">{symbol}</sup>
                {token.amount}
              </h4>
            </div>
            <p className="font-13 m-0 text-light">
              <Moment format="Do MMM YYYY HH:mm">{token.date}</Moment>
            </p>
          </div>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="ibox ibox-fullheight">
            <div className="ibox-head">
              <div className="ibox-title">PAYMENT SYSTEMS</div>
              <div className="ibox-tools">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="ti-more-alt" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  x-placement="bottom-end"
                  style={{
                    position: "absolute",
                    transform: "translate3d(24px, 23px, 0px)",
                    top: "0px",
                    left: "0px",
                    willChange: " transform"
                  }}
                >
                  <Link className="dropdown-item" to="/buy">
                    {" "}
                    <i className="ti-pencil" />
                    Create
                  </Link>
                </div>
              </div>
            </div>
            <div className="ibox-body">
              <ul className="media-list media-list-divider">{transaction}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
