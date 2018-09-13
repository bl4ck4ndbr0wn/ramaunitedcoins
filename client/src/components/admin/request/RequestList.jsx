import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAllTokens } from "../../../actions/admin/requestAction";

import PageContent from "../../layout/PageContent";
import Spinner from "../../common/Spinner";
import RequestItem from "./RequestItem";

class AdminRequestList extends Component {
  componentDidMount() {
    this.props.getAllTokens();
  }

  render() {
    const { tokens, loading } = this.props.token;

    let requestContent;

    if (tokens == null || loading) {
      requestContent = <Spinner />;
    } else {
      if (Object.keys(tokens).length > 0) {
        requestContent = (
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <h4 className="mt-0 header-title">All Token Requests</h4>
                  <p className="text-muted m-b-30 font-14">
                    List of all Token requests
                  </p>
                  <RequestItem tokens={tokens} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        requestContent = (
          <div className="row">
            <div className="col-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <div className="d-flex justify-content-center mb-4">
                    <span className="page-title text-center">
                      You have no past tokens!!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

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
                    <a href="#">Requests</a>
                  </li>
                  <li className="breadcrumb-item active">All Requests</li>
                </ol>
              </div>
              <h4 className="page-title">All Requests</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title end breadcrumb --> */}
        {requestContent}
      </PageContent>
    );
  }
}

AdminRequestList.propTypes = {
  getAllTokens: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.token,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllTokens }
)(AdminRequestList);
