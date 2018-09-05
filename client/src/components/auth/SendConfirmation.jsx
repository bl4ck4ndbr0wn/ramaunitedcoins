import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SendConfirmation.css";
import rama from "./../../assets/img/logo/payment/rama.png";

class SendConfirmation extends Component {
  render() {
    return (
      <div className="jumbotron text-xs-center text-center">
        <img src={rama} alt="Rama logo" style={{ marginBottom: "3rem" }} />
        <h1 className="display-3">Verify Email</h1>
        <p className="lead">
          We sent a verification email.Click the link inside to get started!
        </p>
        <hr />
        <p className="lead">
          <Link className="btn btn-primary btn-sm" to="/" role="button">
            Continue to homepage
          </Link>
        </p>
      </div>
    );
  }
}

export default SendConfirmation;
