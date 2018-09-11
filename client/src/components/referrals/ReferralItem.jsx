import React, { Component } from "react";
import Moment from "react-moment";

export default class ReferralItem extends Component {
  render() {
    const transaction = this.props.referrals.map(refferral => {
      return (
        <tr key={refferral._id}>
          <td>{refferral.handle}</td>
          <td>{refferral.telephone}</td>
          <td>{refferral.country}</td>
          <td>
            <Moment format="DD.MM.YYYY">{refferral.date}</Moment>
          </td>
        </tr>
      );
    });
    return (
      <table id="datatable" className="table table-bordered">
        <thead>
          <tr>
            <th>Handle</th>
            <th>Telephone</th>
            <th>Country</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{transaction}</tbody>
      </table>
    );
  }
}
