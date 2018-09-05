import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import { updateUser, getUserById } from "../../../../actions/admin/userAction";
import {
  getProfileByUserId,
  updateProfile
} from "../../../../actions/profileActions";

import SelectListGroup from "../../../common/SelectListGroup";
import Spinner from "../../../common/Spinner";

import PageContent from "../../../layout/PageContent";
import TextFieldGroup from "../../../common/TextFieldGroup";
import isEmpty from "../../../../validation/is-empty";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      // profile
      handle: "",
      telephone: "",
      country: "",
      referedcode: "",
      referralcode: "",
      amount: "",
      success: "",
      errors: {}
    };
    this.allowPaste = this.allowPaste.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.onSubmitProfile = this.onSubmitProfile.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUserById(this.props.match.params.id);
      this.props.getProfileByUserId(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.userAdmin.user_by_id) {
      const user = nextProps.userAdmin.user_by_id;

      // If user field doesnt exist, make empty string
      user.name = !isEmpty(user.name) ? user.name : "";
      user.email = !isEmpty(user.email) ? user.email : "";
      user.role = !isEmpty(user.role) ? user.role : "";

      this.setState({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }

    if (nextProps.profile.profile_by_id) {
      const profile = nextProps.profile.profile_by_id;

      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.telephone = !isEmpty(profile.telephone) ? profile.telephone : "";
      profile.country = !isEmpty(profile.country) ? profile.country : "";
      profile.referedcode = !isEmpty(profile.referedcode)
        ? profile.referedcode
        : "";
      profile.referralcode = !isEmpty(profile.referralcode)
        ? profile.referralcode
        : "";

      // Set component Fields state
      this.setState({
        handle: profile.handle,
        telephone: profile.telephone,
        country: profile.country,
        referedcode: profile.referedcode,
        referralcode: profile.referralcode,
        amount: profile.amount
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmitUser(e) {
    e.preventDefault();
    this.setState({ errors: {} });

    const userData = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role
    };

    this.props.updateUser(userData);
  }

  onSubmitProfile(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const profileData = {
      handle: this.state.handle,
      telephone: this.state.telephone,
      country: this.state.country,
      referedcode: this.state.referedcode
    };

    this.props.updateProfile(profileData, this.props.match.params.id);
  }
  allowPaste(e) {
    e.stopImmediatePropagation();
    return true;
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.profile;

    console.log(loading);
    let displayProfileButton;
    if (loading) {
      displayProfileButton;
    }

    const options = [
      { label: "* Type of Account", value: 0, icon: "ti-wallet" },
      { label: "Investor", value: "investor", icon: "ti-credit-card" },
      { label: "Agent", value: "agent", icon: "ti-wallet" },
      { label: "Admin", value: "admin", icon: "ti-wallet" }
    ];

    return (
      <PageContent>
        <div class="row">
          <div class="col-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Profile</a>
                  </li>
                  <li class="breadcrumb-item active">User Details</li>
                </ol>
              </div>
              <h4 class="page-title">User Details</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          <div class="col-6">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">Edit Profile</h4>
                {loading ? (
                  <Spinner />
                ) : (
                  <form class="" onSubmit={this.onSubmitProfile}>
                    <div className="form-group text-center row m-t-30">
                      <div className="col-6">
                        <TextFieldGroup
                          placeholder="* Profile Handle"
                          name="handle"
                          value={this.state.handle}
                          onChange={this.onChange}
                          error={errors.handle}
                          info="A unique handle for your profile URL. Your full name, company name, nickname"
                        />
                      </div>
                      <div className="col-6">
                        <TextFieldGroup
                          placeholder="* Telephone Number"
                          name="telephone"
                          value={this.state.telephone}
                          onChange={this.onChange}
                          error={errors.telephone}
                          info="Data format +1869999999999"
                        />
                      </div>
                      <div className="col-12">
                        <TextFieldGroup
                          placeholder="* Country"
                          name="country"
                          value={this.state.country}
                          onChange={this.onChange}
                          error={errors.country}
                        />
                      </div>
                      <div className="col-6">
                        <TextFieldGroup
                          placeholder="Referrer Code (Optional)"
                          name="referedcode"
                          value={this.state.referedcode}
                          onChange={this.onChange}
                          error={errors.referedcode}
                        />
                      </div>
                      <div className="col-6">
                        <TextFieldGroup
                          placeholder="Referrer Code (Optional)"
                          name="referedcode"
                          value={this.state.referralcode}
                          onChange={this.onChange}
                          disabled
                        />
                      </div>

                      <div className="col-12">
                        <TextFieldGroup
                          placeholder="* Amount"
                          name="amount"
                          value={this.state.amount}
                          onChange={this.onChange}
                          error={errors.amount}
                        />
                      </div>

                      <div className="col-12">
                        {" "}
                        <button
                          className="btn btn-info btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">Edit User</h4>
                <div className="col-12">
                  <form class="" onSubmit={this.onSubmitUser}>
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
                    <div className="form-group text-center row m-t-20">
                      <div className="col-12">
                        <button
                          className="btn btn-info btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Update User
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

EditUser.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  getProfileByUserId: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userAdmin: state.userAdmin,
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateUser, getUserById, getProfileByUserId, updateProfile }
)(withRouter(EditUser));
