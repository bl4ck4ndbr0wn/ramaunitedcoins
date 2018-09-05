import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./SendConfirmation.css";
import rama from "./../../assets/img/logo/payment/rama.png";
import TextFieldGroup from "../common/TextFieldGroup";
import { resendEmail } from "./../../actions/authActions";

class ResendConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayEmailInputs: false,
      email: "",
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

    const userData = {
      email: this.state.email
    };

    this.props.resendEmail(userData, this.props.history);
  }

  render() {
    const { errors, displayEmailInputs } = this.state;

    let emailInputs;

    if (displayEmailInputs) {
      emailInputs = (
        <div className="row" style={{ marginBottom: "3rem" }}>
          <div className="col-md-8 m-auto">
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="jumbotron text-xs-center text-center">
        <img src={rama} alt="Rama logo" style={{ marginBottom: "3rem" }} />
        <h1 className="display-3">Confirm Account!</h1>
        <p className="lead">
          <strong>Please check your email</strong> for further instructions on
          how to complete your account setup.
        </p>
        <hr />
        <div className="d-flex justify-content-around">
          <p className="lead">
            <Link className="btn btn-primary btn-sm" to="/" role="button">
              Continue to homepage
            </Link>
          </p>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  displayEmailInputs: !prevState.displayEmailInputs
                }));
              }}
              className="btn btn-light"
            >
              Email didn't arrive?
            </button>
          </div>
        </div>
        {emailInputs}
      </div>
    );
  }
}

ResendConfirmation.propTypes = {
  resendEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resendEmail }
)(withRouter(ResendConfirmation));
