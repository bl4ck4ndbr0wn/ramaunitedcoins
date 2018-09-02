import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { resendEmail } from "./../../actions/authActions";

import AuthLayout from "./layout";
import TextFieldGroup from "../common/TextFieldGroup";

class ResendConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { errors } = this.state;
    return (
      <AuthLayout title="Resend Confirmation Email">
        <form className="form-horizontal m-t-20" onSubmit={this.onSubmit}>
          <div className="alert alert-info alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-hidden="true"
            >
              ×
            </button>
            Enter your <b>Email</b> and instructions will be sent to you!
          </div>

          <div className="form-group">
            <div className="col-xs-12">
              <TextFieldGroup
                placeholder="* Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
            </div>
          </div>

          <div className="form-group text-center row m-t-20">
            <div className="col-12">
              <button
                className="btn btn-info btn-block waves-effect waves-light"
                type="submit"
              >
                Send Email
              </button>
            </div>
          </div>
        </form>
      </AuthLayout>
    );
  }
}

ResendConfirm.propTypes = {
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
)(withRouter(ResendConfirm));
