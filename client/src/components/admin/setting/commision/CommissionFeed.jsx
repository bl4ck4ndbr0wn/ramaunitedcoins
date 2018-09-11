import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

import PageContent from "../../../layout/PageContent";

class Commission extends Component {
  render() {
    let commission;
    if (Object.keys(this.props.commission).length > 0) {
      commission = this.props.commission.map(commission => (
        <tr key={commission._id}>
          <td>{commission.type}</td>
          <td>{commission.percentage}%</td>
          <td>
            <Moment format="YYYY/MM/DD HH:mm">{commission.date}</Moment>
          </td>
          <td>{commission.isActive ? "Active" : "Deactivated"}</td>
          <td>
            <Link
              to={`/admin/settings/edit-commission/${commission._id}`}
              className="btn btn-light"
            >
              <i className="fa fa-edit" />
            </Link>
          </td>
        </tr>
      ));
    } else {
      commission = (
        <tr>
          <td colSpan="5">
            <Link
              to="/admin/settings/commission"
              className="m-4 btn btn-primary justify-content-center"
            >
              New commission
            </Link>
          </td>
        </tr>
      );
    }
    return (
      <div>
        <Link
          to="/admin/settings/commission"
          className="btn btn-primary btn-fix mb-4"
        >
          New Commission
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
              <th>Percentage</th>
              <th>Date</th>
              <th>Active</th>
              <th />
            </tr>
          </thead>
          <tbody>{commission}</tbody>
        </table>
      </div>
    );
  }
}

export default Commission;
