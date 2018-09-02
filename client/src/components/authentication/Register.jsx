import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import AuthLayout from "./layout";
import TextFieldGroup from "../common/TextFieldGroup";

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
    this.setState({ errors: {} });

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
      <AuthLayout title="Register">
        {" "}
        <form className="form-horizontal m-t-20" onSubmit={this.onSubmit}>
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

          <div className="form-group row">
            <div className="col-12">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label font-weight-normal"
                  for="customCheck1"
                >
                  I accept{" "}
                  <a href="#" className="text-muted">
                    Terms and Conditions
                  </a>
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
                Register
              </button>
            </div>
          </div>

          <div className="form-group m-t-10 mb-0 row">
            <div className="col-12 m-t-20 text-center">
              <Link to="/login" className="text-muted">
                Already have account?
              </Link>
            </div>
          </div>
        </form>
      </AuthLayout>
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
