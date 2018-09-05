import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class UserTable extends Component {
  render() {
    const { users } = this.props;

    const userList = users.map(user => (
      <tr key={user._id}>
        <td>
          <Link to={`/user/${user._id}`} style={{ color: "#7536e6" }}>
            {user._id}
          </Link>
        </td>
        <td>{user.name}</td>
        <td>
          <span
            className={`badge ${
              user.role === "admin" ? " badge-danger" : "badge-success"
            } badge-pill
badge-pill`}
          >
            {user.role}
          </span>
        </td>
        <td>
          <Moment format="YYYY/MM/DD">{user.date}</Moment>
        </td>
        <td>
          <Link className="text-muted font-16" to={`/admin/user/${user._id}`}>
            <i className="ti-pencil" />
          </Link>
        </td>
      </tr>
    ));
    return (
      <div class="card-body">
        <h4 class="mt-0 header-title">Users</h4>

        <table
          id="datatable-buttons"
          class="table table-striped table-bordered"
          cellspacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Date</th>
              <th className="no-sort" />
            </tr>
          </thead>
          <tbody>{userList}</tbody>
        </table>
      </div>
    );
  }
}

UserTable.propTypes = {
  users: PropTypes.object.isRequired
};

export default UserTable;
