import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Breadcrumb from "../common/BreadCrumb";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import UserTable from "./UserTable";
import Spinner from "../common/Spinner";

class Users extends Component {
  render() {
    const { users, loading } = this.props.auth;
    let userList;
    if (users === null || loading) {
      userList = <Spinner />;
    } else {
      // Check if logged in user has users data
      if (Object.keys(users).length > 0) {
        userList = <UserTable users={users} />;
      } else {
        userList = (
          <div>
            <p>No yours Found. To add a new user, </p>
            <Link to="/create-profile" className="genric-btn info radius">
              Create New User
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="page-wrapper">
        {/*
    <!-- START HEADER-->*/}
        <Header /> {/*
    <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
      <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="All Users" item="Users" />
          <div className="page-content fade-in-up">
            <div className="ibox">
              <div className="ibox-body">
                <h5 className="font-strong mb-4">DATATABLE</h5>
                <div className="flexbox mb-4">
                  <div className="flexbox">
                    <label className="mb-0 mr-2">Type:</label>
                    <select
                      className="selectpicker show-tick form-control"
                      id="type-filter"
                      title="Please select"
                      data-style="btn-solid"
                      data-width="150px"
                    >
                      <option value="">All</option>
                      <option>Shipped</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Canceled</option>
                    </select>
                  </div>
                  <div className="input-group-icon input-group-icon-left mr-3">
                    <span className="input-icon input-icon-right font-16">
                      <i className="ti-search" />
                    </span>
                    <input
                      className="form-control form-control-rounded form-control-solid"
                      id="key-search"
                      type="text"
                      placeholder="Search ..."
                    />
                  </div>
                </div>
                {userList}
              </div>
            </div>
          </div>
        </div>
        {/*
    <!-- END PAGE CONTENT-->*/}
        <Footer />
      </div>
    );
  }
}

Users.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Users);
