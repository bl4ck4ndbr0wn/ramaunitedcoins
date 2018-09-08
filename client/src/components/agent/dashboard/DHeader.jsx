import React from "react";
import PropTypes from "prop-types";

const DHeader = ({ profile, settings }) => {
  let ruc = 0;
  let notconfirmedTotal = 0;
  let pending;

  const round = settings.round.find(round => round.isActive === true);

  if (round.bonus > 0) {
    ruc = profile.amount * round.bonus;
  }

  console.log(round);
  return (
    <div class="row justify-content-center">
      <div class="col-md-5 col-xl-5">
        <div class="mini-stat clearfix bg-white">
          <span class="mini-stat-icon bg-light">
            <i class="mdi mdi-cart-outline text-danger" />
          </span>
          <div class="mini-stat-info text-right text-muted">
            <span class="counter text-danger">{profile.amount}</span>
            Total RCC
          </div>

          <p class="mb-0 m-t-20 text-muted">
            Price per coin: ${round.price}{" "}
            <span class="pull-right">
              <i class="fa fa-caret-up m-r-5" />
              {round.bonus}% bonus
            </span>
          </p>
        </div>
      </div>
      <div class="col-md-5 col-xl-5">
        <div class="mini-stat clearfix bg-success">
          <span class="mini-stat-icon bg-light">
            <i class="mdi mdi-currency-usd text-success" />
          </span>
          <div class="mini-stat-info text-right  text-white">
            <span class="counter text-info">{ruc}</span>
            Total RUC
          </div>

          <p class="mb-0 m-t-20 text-white">
            Price per coin: ${round.price}{" "}
            <span class="pull-right">
              <i class="fa fa-caret-up m-r-5" />
              {round.bonus}% bonus
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

DHeader.proptypes = {
  profile: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default DHeader;
