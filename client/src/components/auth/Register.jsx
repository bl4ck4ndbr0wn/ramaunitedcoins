import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Rama from "../../assets/img/logo/payment/rama.png";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
                <h4 className="font-strong text-center mb-5">SIGN UP</h4>
                <TextFieldGroup
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  error={errors.name}
                  type="text"
                  onChange={this.onChange}
                  icon="fa fa-user"
                />
                <TextFieldGroup
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={this.onChange}
                  icon="fa fa-envelope"
                  info="This site uses Gravatar so if you want a profile image,
                        use a Gravatar email."
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
                <TextFieldGroup
                  name="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  error={errors.password2}
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
                    REGISTER
                  </button>
                </div>
              </form>
              <div
                className="flexbox mb-5 "
                style={{ flexDirection: "column" }}
              >
                <div className="h6 mb-4">Already a member?</div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-labeled btn-labeled-left btn-icon"
                  >
                    {" "}
                    <span className="btn-label">
                      <i className="ti-unlock" />
                    </span>
                    Login
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
