import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class PhaseVolumeFeed extends Component {
  render() {
    let rounds;

    if (Object.keys(this.props.round).length > 0) {
      rounds = this.props.round.map(round => (
        <tr key={round._id}>
          <td>{round.round}</td>
          <td>{round.price}</td>
          <td>{round.bonus}</td>
          <td>
            <Moment format="YYYY/MM/DD">{round.date}</Moment>
          </td>
          <td>{round.isActive ? "Active" : "Deactivated"}</td>
          <td>
            <Link
              to={`/admin/settings/edit-round/${round._id}`}
              className="btn btn-light"
            >
              <i className="fa fa-edit" />
            </Link>
          </td>
        </tr>
      ));
    } else {
      rounds = (
        <tr>
          <td colSpan="6">
            <Link
              to="/admin/settings/rounds"
              className="m-4 btn btn-primary justify-content-center"
            >
              New Investor Round
            </Link>
          </td>
        </tr>
      );
    }

    return (
      <div className="col-md-6">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title">Phase and Selling Volumes</h4>
            <p class="text-muted m-b-30 font-14">Current Investor Round</p>

            <div className="d-flex justify-content-between mb-4">
              <div className="flexbox">
                <Link
                  to="/admin/settings/rounds"
                  className="btn btn-primary btn-fix"
                >
                  New Investor Round
                </Link>
              </div>
            </div>
            <table
              id="datatable-buttons"
              class="table table-striped table-bordered"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Price</th>
                  <th>Bonus</th>
                  <th>Date</th>
                  <th>Active</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rounds}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PhaseVolumeFeed;
