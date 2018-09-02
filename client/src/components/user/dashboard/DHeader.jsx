import React from "react";

const DHeader = () => {
  return (
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <div class="mini-stat clearfix bg-white">
          <span class="mini-stat-icon bg-light">
            <i class="mdi mdi-cart-outline text-danger" />
          </span>
          <div class="mini-stat-info text-right text-muted">
            <span class="counter text-danger">15852</span>
            Total Sales
          </div>
          <p class="mb-0 m-t-20 text-muted">
            Total income: $22506{" "}
            <span class="pull-right">
              <i class="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="mini-stat clearfix bg-success">
          <span class="mini-stat-icon bg-light">
            <i class="mdi mdi-currency-usd text-success" />
          </span>
          <div class="mini-stat-info text-right text-white">
            <span class="counter text-white">956</span>
            New Orders
          </div>
          <p class="mb-0 m-t-20 text-light">
            Total income: $22506{" "}
            <span class="pull-right">
              <i class="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="mini-stat clearfix bg-white">
          <span class="mini-stat-icon bg-light">
            <i class="mdi mdi-cube-outline text-warning" />
          </span>
          <div class="mini-stat-info text-right text-muted">
            <span class="counter text-warning">5210</span>
            New Users
          </div>
          <p class="mb-0 m-t-20 text-muted">
            Total income: $22506{" "}
            <span class="pull-right">
              <i class="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="mini-stat clearfix bg-info">
          <span class="mini-stat-icon bg-light">
            <i class="mdi mdi-currency-btc text-info" />
          </span>
          <div class="mini-stat-info text-right text-light">
            <span class="counter text-white">20544</span>
            Unique Visitors
          </div>
          <p class="mb-0 m-t-20 text-light">
            Total income: $22506{" "}
            <span class="pull-right">
              <i class="fa fa-caret-up m-r-5" />
              10.25%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DHeader;
