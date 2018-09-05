import React, { Component } from "react";

export default class DHeader extends Component {
  render() {
    const { tokens, profile, settings } = this.props;

    console.log(settings);
    let confirmedTotal = 0;
    let notconfirmedTotal = 0;
    let pending;
    tokens.map(token => {
      if (token.confirmed) confirmedTotal = confirmedTotal + 1;
      else notconfirmedTotal = notconfirmedTotal + 1;
    });
    return (
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <div className="card-body flexbox-b justify-content-between">
              <div
                className="easypie mr-4"
                data-percent="73"
                data-bar-color="#18C5A9"
                data-size="80"
                data-line-width="8"
              >
                <span
                  className="easypie-data text-success"
                  style={{ fontSize: "32px" }}
                >
                  <i className="la la-money" />
                </span>
                <canvas height="80" width="80" />
              </div>
              <div>
                <h3 className="font-strong text-success">
                  {profile.amount} RCC
                </h3>

                <div className="text-muted">RCC Balance</div>
                <h3 className="font-strong text-success">
                  {" "}
                  {profile.amount * settings.round[0].bonus} RUC
                </h3>
                <div className="text-muted">RUC Balance</div>
              </div>
              <div>
                <h3 className="font-strong text-pink">
                  {settings.round[0].price} USD
                </h3>
                <div className="text-muted">Price/coin</div>

                <h3 className="font-strong text-pink">
                  {settings.round[0].bonus}%
                </h3>
                <div className="text-muted">Bonus</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <div className="card-body flexbox-b">
              <div
                className="easypie mr-4"
                data-percent="42"
                data-bar-color="#5c6bc0"
                data-size="80"
                data-line-width="8"
              >
                <span className="easypie-data font-26 text-primary">
                  <i className="ti-world" />
                </span>
                <canvas height="80" width="80" />
              </div>
              <div>
                <h3 className="font-strong text-primary">{confirmedTotal}</h3>
                <div className="text-muted">CONFIRMED TOKEN REQUESTS</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <div className="card-body flexbox-b">
              <div
                className="easypie mr-4"
                data-percent="70"
                data-bar-color="#ff4081"
                data-size="80"
                data-line-width="8"
              >
                <span
                  className="easypie-data text-pink"
                  style={{ fontSize: "32px" }}
                >
                  <i className="la la-tags" />
                </span>
                <canvas height="80" width="80" />
              </div>
              <div>
                <h3 className="font-strong text-pink">{notconfirmedTotal}</h3>
                <div className="text-muted">PENDING TOKEN REQUESTS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
