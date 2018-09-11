import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getAllUsers } from "../../../actions/admin/userAction";

import UserTable from "./UserTable";
import PageContent from "../../layout/PageContent";
import Spinner from "../../common/Spinner";

class Users extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { users, loading } = this.props.userAdmin;
    let userList;

    if (users === null || loading) {
      userList = <Spinner />;
    } else {
      // Check if logged in user has users data
      if (Object.keys(users).length > 0) {
        userList = <UserTable users={users} />;
      }
    }

    return (
      <PageContent>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Users</a>
                  </li>
                  <li className="breadcrumb-item active">All Users</li>
                </ol>
              </div>
              <h4 className="page-title">All Users</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}

        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">{userList}</div>
          </div>
        </div>
      </PageContent>
    );
  }
}

Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  userAdmin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userAdmin: state.userAdmin,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(Users);
