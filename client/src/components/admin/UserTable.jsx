import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteAccount } from "../../actions/profileActions";

const $ = require("jquery");
// $.DataTable = require("datatables.net");

class UserTable extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    //   pageLength: 10,
    //   fixedHeader: true,
    //   responsive: true,
    //   sDom: "rtip",
    //   columnDefs: [
    //     {
    //       targets: "no-sort",
    //       orderable: false
    //     }
    //   ]
    // });
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { users } = this.props;

    const userList = users.map(user => (
      <tr>
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
          <a className="text-muted font-16" href="javascript:;">
            <i className="ti-trash" />
          </a>
        </td>
      </tr>
    ));
    return (
      <div className="table-responsive row">
        <table
          className="table table-bordered table-hover"
          id="datatable"
          ref={el => (this.el = el)}
        >
          <thead className="thead-default thead-lg">
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAccount }
)(UserTable);
