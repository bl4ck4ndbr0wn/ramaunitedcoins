import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authActions";

import AuthLayout from "./layout";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <AuthLayout title="Sign In">
        <form className="form-horizontal m-t-20" onSubmit={this.onSubmit}>
          <div className="form-group row">
            <div className="col-12">
              <TextFieldGroup
                name="email"
                placeholder="Email address"
                value={this.state.email}
                error={errors.email}
                type="email"
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-12">
              <TextFieldGroup
                name="password"
                placeholder="password"
                value={this.state.password}
                error={errors.password}
                type="password"
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-12">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
          </div>

          <div className="form-group text-center row m-t-20">
            <div className="col-12">
              <button
                className="btn btn-info btn-block waves-effect waves-light"
                type="submit"
              >
                Log In
              </button>
            </div>
          </div>

          <div className="form-group m-t-10 mb-0 row">
            <div className="col-sm-7 m-t-20">
              <a href="pages-recoverpw.html" className="text-muted">
                <i className="mdi mdi-lock    " /> Forgot your password?
              </a>
            </div>
            <div className="col-sm-5 m-t-20">
              <Link to="/register" className="text-muted">
                <i className="mdi mdi-account-circle" /> Create an account
              </Link>
            </div>
          </div>
        </form>
      </AuthLayout>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
