import React, { Component } from "react";

import PageContent from "../../layout/PageContent";

class AdminDashboard extends Component {
  render() {
    return (
      <PageContent>
        {/* <!-- Page-Title --> */}
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Rama United Coins</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
      </PageContent>
    );
  }
}

export default AdminDashboard;
