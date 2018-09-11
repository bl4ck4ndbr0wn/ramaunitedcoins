import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class AccountAddressFeed extends Component {
  render() {
    let accounts;
    if (Object.keys(this.props.account).length > 0) {
      accounts = this.props.account.map(account => (
        <tr key={account._id}>
          <td>{account.type}</td>
          <td>{account.address.substring(0, 8) + "..."}</td>
          <td>
            <Moment format="YYYY/MM/DD">{account.date}</Moment>
          </td>
          <td>{account.isActive ? "Active" : "Deactivated"}</td>
          <td>
            <Link
              to={`/admin/settings/edit-account/${account._id}`}
              className="btn btn-light"
            >
              <i className="fa fa-edit" />
            </Link>
          </td>
        </tr>
      ));
    } else {
      accounts = (
        <tr>
          <td colSpan="5">
            <Link
              to="/admin/settings/account"
              className="m-4 btn btn-primary justify-content-center"
            >
              New Account
            </Link>
          </td>
        </tr>
      );
    }
    return (
      <div>
        <Link
          to="/admin/settings/account"
          className="btn btn-primary btn-fix mb-4"
        >
          New Account
        </Link>
        <table
          id="datatable-buttons"
          className="table table-striped table-bordered"
          id="tech-companies-1"
          className="table  table-striped"
          cellspacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>Type</th>
              <th>Address</th>
              <th>Date</th>
              <th>Active</th>
              <th />
            </tr>
          </thead>
          <tbody>{accounts}</tbody>
        </table>
      </div>
    );
  }
}

export default AccountAddressFeed;
