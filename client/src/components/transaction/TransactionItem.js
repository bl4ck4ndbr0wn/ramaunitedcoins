import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default class TransactionItem extends Component {
  render() {
    const transaction = this.props.tokens.map(token => (
      <tr key={token._id}>
        <td>
          <a href="javascript:;">{token._id}</a>
        </td>
        <td>{token.modetransfer}</td>
        <td>${token.amount}</td>
        <td>
          <span
            class={`badge badge-${
              token.confirmed ? "success" : "primary"
            } badge-pill`}
          >
            {token.confirmed ? "Confirmed" : "Pending"}
          </span>
        </td>
        <td>{token.document.length}</td>
        <td>
          <Moment format="DD.MM.YYYY">{token.date}</Moment>
        </td>
        <td>
          <Link
            to={`/admin/transaction/${token._id}`}
            className="btn btn-light"
          >
            <i className="fa fa-edit" />
          </Link>
        </td>
        <td>
          <a class="text-muted font-16" href="javascript:;">
            <i class="ti-trash" />
          </a>
        </td>
      </tr>
    ));
    return (
      <div class="table-responsive row">
        <table class="table table-bordered table-hover" id="datatable">
          <thead class="thead-default thead-lg">
            <tr>
              <th>Transaction ID</th>
              <th>Mode of Payment</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Document</th>
              <th>Date</th>
              <th class="no-sort" />
              <th class="no-sort" />
            </tr>
          </thead>
          {transaction}
        </table>
      </div>
    );
  }
}
