import React, { Component } from "react";

import PageContent from "../../layout/PageContent";

class AdminDashboard extends Component {
  render() {
    return (
      <PageContent>
        {/* <!-- Page-Title --> */}
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="btn-group pull-right">
                <ol class="breadcrumb hide-phone p-0 m-0">
                  <li class="breadcrumb-item">
                    <a href="#">Rama United Coins</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              <h4 class="page-title">Dashboard</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
      </PageContent>
    );
  }
}

export default AdminDashboard;
