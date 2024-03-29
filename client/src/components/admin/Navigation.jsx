import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ users }) => {
  return (
    <div>
      <div className="d-flex">
        <Link className="mega-toolbar-item" to="/admin/users">
          <div className="item-icon">
            <i className="la la-users" />
          </div>
          <div className="item-name">Users</div>
          <div className="item-text">Hover to view results.</div>
          <div className="item-details">
            {users !== null ? users.length : "0"} New
          </div>
        </Link>
        <Link className="mega-toolbar-item" to="/admin/settings">
          <div className="item-icon">
            <i className="ti-file" />
          </div>
          <div className="item-name">Settings</div>
          <div className="item-text">Change Default System Settings.</div>
          <div className="item-details">Update</div>
        </Link>
      </div>
      <div className="d-flex">
        <Link className="mega-toolbar-item" to="/transactions">
          <div className="item-icon">
            <i className="ti-file" />
          </div>
          <div className="item-name">Transaction</div>
          <div className="item-text">Confirm Payments.</div>
          <div className="item-details">Confirm</div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
