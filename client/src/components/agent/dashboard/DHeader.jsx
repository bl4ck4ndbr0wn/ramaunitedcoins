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
    <div className="row justify-content-center">
      <div className="col-md-4 col-xl-4">
        <div className="mini-stat clearfix bg-white">
          <span className="mini-stat-icon bg-light">
            <i className="mdi mdi-currency-usd text-danger" />
          </span>
          <div className="mini-stat-info text-right text-muted">
            <span className="counter text-danger">{profile.amount}</span>
            Total RCC
          </div>
          <div className="mini-stat-info text-right  text-muted">
            <span className="counter text-info">{ruc}</span>
            Total RUC
          </div>
        </div>
      </div>
      <div className="col-md-4 col-xl-4">
        <div className="mini-stat clearfix bg-success">
          <span className="mini-stat-icon bg-light">
            <i className="mdi mdi-currency-usd text-success" />
          </span>
          <div className="mini-stat-info text-right  text-white">
            <span className="counter text-info">${round.price}</span>
            Price per coin
          </div>
          <div className="mini-stat-info text-right  text-white">
            <span className="counter text-danger">{round.bonus}%</span>
            bonus
          </div>
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
