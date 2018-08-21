import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class AccountFeed extends Component {
  render() {
    let accounts;
    if (Object.keys(this.props.account).length > 0) {
      accounts = this.props.account.map(account => (
        <tr key={account._id}>
          <td>{account.type}</td>
          <td>{account.address}</td>
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
        <div>
          <Link
            to="/admin/settings/account"
            className="m-4 btn btn-primary justify-content-center"
          >
            New Account
          </Link>
        </div>
      );
    }
    return (
      <div class="col-md-6">
        <div class="ibox">
          <div class="ibox-head">
            <div class="ibox-title">Company Accounts.</div>
          </div>
          <div class="ibox-body">
            <div class="table-responsive">
              <table class="table">
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
          </div>
        </div>
      </div>
    );
  }
}

export default AccountFeed;
