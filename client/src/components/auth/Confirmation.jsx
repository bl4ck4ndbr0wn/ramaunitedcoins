import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import "./SendConfirmation.css";
import rama from "../../assets/img/logo/payment/rama.png";
import { confirmAccount } from "../../actions/authActions";

class Confirmation extends Component {
  onSubmit(e) {
    if (this.props.match.params.id) {
      const tokenField = {
        token: this.props.match.params.id
      };

      this.props.confirmAccount(tokenField, this.props.history);
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    const { user } = this.props.auth;

    if (user !== null) {
      if (user.isVerified) this.props.history.push("/");
    }
    return (
      <div class="jumbotron text-xs-center text-center">
        <img src={rama} alt="Rama logo" style={{ marginBottom: "3rem" }} />
        <h1 class="display-3">Verify Email</h1>
        <p class="lead">
          <strong>Please click Verify</strong> to complete your account setup.
        </p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={this.onSubmit.bind(this)}
          >
            Verify Email
          </button>
        </div>
        <p class="lead">
          <Link class="btn btn-light btn-sm" to="/" role="button">
            Continue to homepage
          </Link>
        </p>
      </div>
    );
  }
}
Confirmation.propTypes = {
  confirmAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { confirmAccount }
)(Confirmation);
