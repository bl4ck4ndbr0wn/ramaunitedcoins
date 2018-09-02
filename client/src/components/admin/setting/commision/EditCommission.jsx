import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PageContent from "../../../layout/PageContent";

class EditCommission extends Component {
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
                    <a href="#">Settings</a>
                  </li>
                  <li class="breadcrumb-item active">Edit Commission</li>
                </ol>
              </div>
              <h4 class="page-title">Edit Commission</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        <div class="row">
          <div class="col-12">
            <div class="card m-b-30">
              <div class="card-body">
                <div className="d-flex justify-content-center mb-4">
                  <span class="page-title text-center">Comission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}

EditCommission.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(EditCommission);
