import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      telephone: "",
      country: "",
      referralcode: "",
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

    const profileData = {
      handle: this.state.handle,
      telephone: this.state.telephone,
      country: this.state.country,
      referralcode: this.state.referralcode
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="page-wrapper">
        {/*
  <!-- START HEADER-->*/}
        <Header /> {/*
  <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
    <!-- START PAGE CONTENT-->*/}
          <div className="page-content fade-in-up">
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <div className="ibox ibox-fullheight">
                  <div className="ibox-head">
                    <div className="ibox-title">Create Your Profile</div>
                  </div>
                  <br />
                  <p className="lead text-center" style={{ fontSize: "small" }}>
                    Let's get some information to make your profile stand out
                  </p>
                  <form className="form-info" onSubmit={this.onSubmit}>
                    <div className="ibox-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your full name, company name, nickname"
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextFieldGroup
                            placeholder="* Telephone Number"
                            name="telephone"
                            value={this.state.telephone}
                            onChange={this.onChange}
                            error={errors.telephone}
                            info="Data format +1869999999999"
                          />
                        </div>
                      </div>
                      <TextFieldGroup
                        placeholder="* Country"
                        name="country"
                        value={this.state.country}
                        onChange={this.onChange}
                        error={errors.country}
                      />
                      <TextFieldGroup
                        placeholder="Referral  Code"
                        name="referralcode"
                        value={this.state.referralcode}
                        onChange={this.onChange}
                        error={errors.referralcode}
                      />
                    </div>
                    <div className="ibox-footer">
                      <button className="btn btn-info mr-2" type="submit">
                        Submit
                      </button>
                      <Link to="/" className="btn btn-secondary" type="reset">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*
  <!-- END PAGE CONTENT-->*/}

          <Footer />
        </div>
      </div>
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
