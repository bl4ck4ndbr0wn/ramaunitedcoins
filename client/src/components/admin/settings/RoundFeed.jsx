import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class RoundFeed extends Component {
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
        <div>
          <Link
            to="/admin/settings/rounds"
            className="m-4 btn btn-primary justify-content-center"
          >
            New Investor Round
          </Link>
        </div>
      );
    }

    return (
      <div className="col-md-6">
        <div className="ibox">
          <div className="ibox-head">
            <div className="ibox-title">Investor Rounds</div>
          </div>
          <div className="ibox-body">
            <div className="table-responsive">
              <table className="table">
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
      </div>
    );
  }
}

export default RoundFeed;
