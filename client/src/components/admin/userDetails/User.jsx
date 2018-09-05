import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProfileByUserId } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import ProfileHeader from "./ProfileHeader";

class User extends Component {
  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getProfileByUserId(this.props.match.params.user_id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
      <!-- START PAGE CONTENT-->*/}
          <ProfileHeader profile={profile} />
        </div>
      );
    }
    return (
      <div className="page-wrapper">
        {/*<!-- START HEADER-->*/}
        <Header />
        {/*<!-- END HEADER-->*/}
        {profileContent}
        {/*<!-- END PAGE CONTENT-->*/}
        <Footer />
      </div>
    );
  }
}

User.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByUserId }
)(User);
