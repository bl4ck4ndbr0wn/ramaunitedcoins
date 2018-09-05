import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import "./Login.css";
import TextFieldGroup from "../common/TextFieldGroup";
import Rama from "../../assets/img/logo/payment/rama.png";

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row login-content justify-content-center">
          <div className="col-10 bg-white">
            <div className="text-center">
              <span className="auth-head-icon">
                <img src={Rama} alt="RUC Logo" />
              </span>
            </div>
            <div className="ibox m-0" style={{ boxShadow: "none" }}>
              <form
                className="ibox-body"
                id="login-form"
                onSubmit={this.onSubmit}
              >
                <h4 className="font-strong text-center mb-5">LOG IN</h4>
                <TextFieldGroup
                  name="email"
                  placeholder="Email address"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={this.onChange}
                  icon="fa fa-envelope"
                />
                <TextFieldGroup
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  error={errors.password}
                  type="password"
                  onChange={this.onChange}
                  icon="fa fa-lock"
                />
                <div className="flexbox mb-5">
                  <a className="text-primary" href="/forgot_password">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-rounded btn-block btn-air"
                  >
                    LOGIN
                  </button>
                </div>
              </form>

              <div
                className="flexbox mb-5 "
                style={{ flexDirection: "column" }}
              >
                <div className="h6 mb-4">Not a member?</div>

                <div className="text-center">
                  <Link
                    to="/register"
                    className="btn btn-primary btn-labeled btn-labeled-left btn-icon"
                  >
                    {" "}
                    <span className="btn-label">
                      <i className="la la-user-plus" />
                    </span>
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
