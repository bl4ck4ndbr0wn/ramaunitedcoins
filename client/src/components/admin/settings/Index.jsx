import React, { Component } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Breadcrumb from "../../common/BreadCrumb";
import Rounds from "./Rounds";
import Accounts from "./Account";

class Settings extends Component {
  render() {
    return (
      <div className="page-wrapper">
        {/*
    <!-- START HEADER-->*/}
        <Header /> {/*
    <!-- END HEADER-->*/}
        <div className="content-wrapper" style={{ minHeight: "100vh" }}>
          {/*
      <!-- START PAGE CONTENT-->*/}
          <Breadcrumb title="ACCOUNT SETTINGS" item="Settings" />
          <div className="page-content fade-in-up">
            <div class="row">
              <Rounds />
              <Accounts />
            </div>
          </div>
        </div>
        {/*
    <!-- END PAGE CONTENT-->*/}
        <Footer />
      </div>
    );
  }
}

export default Settings;
