import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardUser extends Component {
  render() {
    const { user, profile } = this.props;

    return (
      <div className="row  justify-content-md-center">
        <div className="col-lg-12">
          <div className="ibox ibox-fullheight">
            <div className="ibox-head">
              <div className="ibox-title">Welcome {user.name}</div>
            </div>
            <div className="ibox-body">
              <div className="row align-items-center">
                <div className="col-12">
                  <Link to="/buy" className="btn btn-primary btn-fix">
                    <span className="btn-icon">
                      <i className="la la-plus" />
                      Request To Buy RCC Token
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardUser;
