import React from "react";
import PropTypes from "prop-types";

import Rama from "../../../assets/img/logo/payment/rama.png";
const AuthLayout = props => {
  return (
    <div>
      <div className="accountbg" />
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center mt-0 m-b-15">
              <a href="index.html" className="logo logo-admin">
                <img src={Rama} height="40" alt="Ramalogo" />
              </a>
            </h3>

            <h4 className="text-muted text-center font-18">
              <b>{props.title}</b>
            </h4>

            <div className="p-3">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired
};

export default AuthLayout;
