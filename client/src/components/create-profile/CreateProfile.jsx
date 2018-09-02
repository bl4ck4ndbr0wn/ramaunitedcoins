import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import { createProfile } from "../../actions/profileActions";

import PageContent from "../layout/PageContent";
import TextFieldGroup from "../common/TextFieldGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      telephone: "",
      country: "",
      referedcode: "",
      errors: {}
    };
    this.allowPaste = this.allowPaste.bind(this);
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

    const profileData = {
      handle: this.state.handle,
      telephone: this.state.telephone,
      country: this.state.country,
      referedcode: this.state.referedcode
    };

    this.props.createProfile(profileData, this.props.history);
  }
  allowPaste(e) {
    e.stopImmediatePropagation();
    return true;
  }

  render() {
    const { errors } = this.state;

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
                  <li class="breadcrumb-item active">Create Profile</li>
                </ol>
              </div>
              <h4 class="page-title">Create Profile</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div class="row justify-content-md-center">
          <div class="col-8">
            <div class="card m-b-30">
              <div class="card-body">
                <h4 class="mt-0 header-title">Create Profile</h4>
                <form class="" onSubmit={this.onSubmit}>
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
                    <div className="col-12">
                      <TextFieldGroup
                        placeholder="Referrer Code (Optional)"
                        name="referedcode"
                        value={this.state.referedcode}
                        onChange={this.onChange}
                        onPaste={this.allowPaste}
                        error={errors.referedcode}
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-info btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Create Profile
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
