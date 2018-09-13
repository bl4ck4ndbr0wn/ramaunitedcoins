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
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="btn-group pull-right">
                <ol className="breadcrumb hide-phone p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="#">Admin</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Settings</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Commission</li>
                </ol>
              </div>
              <h4 className="page-title">Edit Commission</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <div className="d-flex justify-content-center mb-4">
                  <span className="page-title text-center">Comission</span>
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
