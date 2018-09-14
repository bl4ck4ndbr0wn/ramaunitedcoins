import React from "react";
import Moment from "react-moment";

export default ({ token }) => {
  return (
    <div className="col-12">
      <div className="invoice-title">
        <h4 className="pull-right font-16">
          <strong>Order # {token._id}</strong>
        </h4>
        <h3 className="m-t-0">
          <img src={token.user.avatar} alt="logo" height="32" />
        </h3>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <address>
            <strong>Billed To:</strong>
            <br />
            {token.user.name}
            <br /> {token.user.email}
            <br />
            Account created on:
            <Moment format="YYYY/MM/DD HH:mm">{token.user.date}</Moment>
            <br />
            {token.user.role}
          </address>
        </div>
        <div className="col-6 text-right">
          <address>
            <strong>Approval:</strong>
            <br />
            By:
            <br />
            email:
            <br />{" "}
            {token.confirmed ? (
              <a href="#" className="btn btn-success waves-effect waves-l ight">
                <i className="fa fa-print" /> Approved
              </a>
            ) : (
              <a href="#" className="btn btn-success waves-effect waves-l ight">
                <i className="fa fa-print" /> Pending
              </a>
            )}
            <br />
            <br />
          </address>
        </div>
      </div>
      <div className="row">
        <div className="col-6 m-t-30">
          <address>
            <strong>Payment Method:</strong>
            <br />
            {token.modetransfer}
            <br />
            {token.user.email}
          </address>
        </div>
        <div className="col-6 m-t-30 text-right">
          <address>
            <strong>Order Date:</strong>
            <br />
            <Moment format="YYYY/MM/DD HH:mm">{token.date}</Moment>
            <br />
            <br />
          </address>
        </div>
      </div>
    </div>
  );
};