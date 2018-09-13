import React from "react";

const DHeader = () => {
  return (
    <div className="row">
      <div className="col-md-6 col-xl-3">
        <div className="mini-stat clearfix bg-white">
          <span className="mini-stat-icon bg-light">
            <i className="mdi mdi-cart-outline text-danger" />
          </span>
          <div className="mini-stat-info text-right text-muted">
            <span className="counter text-danger">15852</span>
            Total Sales
          </div>
          <p className="mb-0 m-t-20 text-muted">
            Total income: $22506{" "}
            <span className="pull-right">
              <i className="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="mini-stat clearfix bg-success">
          <span className="mini-stat-icon bg-light">
            <i className="mdi mdi-currency-usd text-success" />
          </span>
          <div className="mini-stat-info text-right text-white">
            <span className="counter text-white">956</span>
            New Orders
          </div>
          <p className="mb-0 m-t-20 text-light">
            Total income: $22506{" "}
            <span className="pull-right">
              <i className="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="mini-stat clearfix bg-white">
          <span className="mini-stat-icon bg-light">
            <i className="mdi mdi-cube-outline text-warning" />
          </span>
          <div className="mini-stat-info text-right text-muted">
            <span className="counter text-warning">5210</span>
            New Users
          </div>
          <p className="mb-0 m-t-20 text-muted">
            Total income: $22506{" "}
            <span className="pull-right">
              <i className="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="mini-stat clearfix bg-info">
          <span className="mini-stat-icon bg-light">
            <i className="mdi mdi-currency-btc text-info" />
          </span>
          <div className="mini-stat-info text-right text-light">
            <span className="counter text-white">20544</span>
            Unique Visitors
          </div>
          <p className="mb-0 m-t-20 text-light">
            Total income: $22506{" "}
            <span className="pull-right">
              <i className="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DHeader;
