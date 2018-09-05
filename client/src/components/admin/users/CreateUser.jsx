import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/admin/userAction";

import PageContent from "../../layout/PageContent";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      role: "",
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Type of Account", value: 0, icon: "ti-wallet" },
      { label: "Investor", value: "investor", icon: "ti-credit-card" },
      { label: "Agent", value: "agent", icon: "ti-wallet" },
      { label: "Admin", value: "admin", icon: "ti-wallet" }
    ];

    return (
      <PageContent>
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Users</a>
                  </li>
                  <li class="breadcrumb-item active">Create User</li>
                </ol>
              </div>
              <h4 class="page-title">Create User</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          <div class="col-8">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">New User</h4>

                <form class="" onSubmit={this.onSubmit}>
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
                  <SelectListGroup
                    placeholder="Select Role"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                    options={options}
                    error={errors.role}
                    info="Choose a Role for this User."
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
                  <div className="form-group text-center row m-t-20">
                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Create User
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

CreateUser.propTypes = {
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
)(withRouter(CreateUser));
