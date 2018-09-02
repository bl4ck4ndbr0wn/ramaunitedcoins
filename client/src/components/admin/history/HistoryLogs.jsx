import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PageContent from "../../layout/PageContent";

class HistoryLogs extends Component {
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
                    <a href="#">Admin</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Requests</a>
                  </li>
                  <li class="breadcrumb-item active">All Requests</li>
                </ol>
              </div>
              <h4 class="page-title">All Requests</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        <div class="row">
          <div class="col-12">
            <div class="card m-b-30">
              <div class="card-body">
                <div className="d-flex justify-content-center mb-4">
                  <span class="page-title text-center">
                    Your History logs!!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

HistoryLogs.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(HistoryLogs);
